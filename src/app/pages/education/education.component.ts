import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  addEducation,
  removeEducation,
  selectSection,
} from './../../state/CV-State/cv.actions';
import { IEducation } from 'src/app/shared/interface/education.interface';
import {
  selectEducation,
  selectSections,
} from './../../state/CV-State/cv.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Subject, takeUntil } from 'rxjs';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit, OnDestroy {
  education: IEducation[] = [];
  newEducationForm!: FormGroup;
  showNewEducationRow = false;
  destroy$ = new Subject();
  sections: ISection[] = [];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToasterService
  ) {
    this.store
      .select(selectEducation)
      .pipe(takeUntil(this.destroy$))
      .subscribe((education: IEducation[]) => {
        this.education = education;
      });
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

  ngOnInit(): void {}

  addEducation() {
    this.showNewEducationRow = true;
    this.newEducationForm = this.fb.group({
      degree: ['', Validators.required],
      batch: ['', Validators.required],
      university: ['', Validators.required],
    });
    this.showNewEducationRow = true;
  }

  deleteEducation(education: IEducation) {
    this.store.dispatch(removeEducation({ education }));
  }

  cancelEducation(): void {
    this.showNewEducationRow = false;
  }

  saveEducation(): void {
    if (this.newEducationForm.valid) {
      this.store.dispatch(
        addEducation({ education: this.newEducationForm.value })
      );
      this.addEducation();
    }
  }

  goToNextSection(): void {
    if (this.education.length) {
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].active) {
          this.store.dispatch(selectSection({ section: this.sections[i + 1] }));
          this.router.navigate([`../${this.sections[i + 1].routerLink}`], {
            relativeTo: this.activatedRoute,
          });
          break;
        }
      }
    } else {
      this.toastr.error('Please provide atleast 1 education !!');
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
