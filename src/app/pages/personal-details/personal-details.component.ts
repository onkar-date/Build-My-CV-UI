import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { ISection } from './../../shared/interface/section.interface';
import { savePersonalDetails } from './../../state/CV-State/cv.actions';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import { selectPersonalDetails } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  sections: ISection[] = SECTIONS;
  personalDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    this.personalDetailsForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((formValue) => {
        this.store.dispatch(
          savePersonalDetails({ personalDetails: formValue })
        );
      });
  }

  goToNextSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.nextSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  goToPreviousSection(): void {
    this.router.navigate([`../../templates`], {
      relativeTo: this.activatedRoute,
    });
  }
}
