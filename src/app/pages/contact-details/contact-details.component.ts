import { ISection } from './../../shared/interface/section.interface';
import { ICOntactDetails } from './../../shared/interface/contactDetails.interface';
import {
  selectContactDetails,
  selectSections,
} from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { saveContactDetails, selectSection } from 'src/app/state/CV-State/cv.actions';
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
  sections: ISection[] = [];
  contactDetailsForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_: ISection[]) => (this.sections = _));
  }

  ngOnInit(): void {
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
      linkedIn: [contactDetails.linkedIn, Validators.required],
    });
  }

  goToNextSection(): void {
    if (this.contactDetailsForm.valid) {
      this.store.dispatch(
        saveContactDetails({ contactDetails: this.contactDetailsForm.value })
      );
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].active) {
          this.store.dispatch(selectSection({ section: this.sections[i + 1] }));
          this.router.navigate([`../${this.sections[i + 1].routerLink}`], {
            relativeTo: this.activatedRoute,
          });
          break;
        }
      }
    }
  }

  goToPreviousSection(): void {
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].active) {
        this.store.dispatch(selectSection({ section: this.sections[i - 1] }));
        this.router.navigate([`../${this.sections[i - 1].routerLink}`], {
          relativeTo: this.activatedRoute,
        });
        break;
      }
    }
  }
}
