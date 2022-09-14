import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { ISection } from './../../shared/interface/section.interface';
import { ICOntactDetails } from './../../shared/interface/contactDetails.interface';
import { selectContactDetails } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { saveContactDetails } from 'src/app/state/CV-State/cv.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  private readonly destroy$ = new Subject();
  sections: ISection[] = SECTIONS;
  contactDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.store
      .select(selectContactDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((contactDetails: ICOntactDetails) => {
        this.initForm(contactDetails);
      });
  }

  initForm(contactDetails: ICOntactDetails): void {
    this.contactDetailsForm = this.fb.group({
      mobile: [contactDetails.mobile, Validators.required],
      email: [contactDetails.email, Validators.required],
      address: [contactDetails.address, Validators.required],
      linkedIn: [contactDetails.linkedIn],
    });
    this.contactDetailsForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe((contactDetails) => {
        this.store.dispatch(saveContactDetails({ contactDetails }));
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
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.previousSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }
}
