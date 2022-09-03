import { savePersonalDetails } from './../../state/CV-State/cv.actions';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import { selectPersonalDetails } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  personalDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectPersonalDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((personalDetails: IPersonalDetails) => {
        this.initForm(personalDetails);
      });
  }

  initForm(personalDetails: IPersonalDetails): void {
    this.personalDetailsForm = this.fb.group({
      firstName: [personalDetails.firstName, Validators.required],
      lastName: [personalDetails.lastName, Validators.required],
      address: [personalDetails.address, Validators.required],
      areaOfExpertise: [personalDetails.areaOfExpertise, Validators.required],
    });
  }

  goToNextSection(): void {
    if (this.personalDetailsForm.valid) {
      this.store.dispatch(
        savePersonalDetails({ personalDetails: this.personalDetailsForm.value })
      );
      this.router.navigate(['../skills'], { relativeTo: this.activatedRoute });
    }
  }
}
