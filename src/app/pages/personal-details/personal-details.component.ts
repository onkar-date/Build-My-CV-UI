import { ISection } from './../../shared/interface/section.interface';
import { savePersonalDetails, selectSection } from './../../state/CV-State/cv.actions';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import {
  selectPersonalDetails,
  selectSections,
} from './../../state/CV-State/cv.selectors';
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
  sections: ISection[] = [];
  personalDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
  }

  ngOnDestroy(): void {
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
      areaOfExpertise: [personalDetails.areaOfExpertise, Validators.required],
      aboutMe: [personalDetails.aboutMe, Validators.required],
    });
  }

  goToNextSection(): void {
    if (this.personalDetailsForm.valid) {
      this.store.dispatch(
        savePersonalDetails({ personalDetails: this.personalDetailsForm.value })
      );
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].active) {
          this.store.dispatch(selectSection({ section: this.sections[i + 1] }));
          this.router.navigate([`../${this.sections[i+1].routerLink}`], {
            relativeTo: this.activatedRoute,
          });
          break;
        }
      }
    }
  }
}
