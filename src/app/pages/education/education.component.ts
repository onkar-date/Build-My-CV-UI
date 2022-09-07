import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addEducation, removeEducation } from './../../state/CV-State/cv.actions';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { selectEducation } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  education$ = this.store.select(selectEducation);
  newEducationForm!: FormGroup;
  showNewEducationRow = false;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  addEducation() {
    this.showNewEducationRow = true;
    this.newEducationForm = this.fb.group({
      degree: ['', Validators.required],
      batch: ['', Validators.required],
      university: ['', Validators.required]
    })
    this.showNewEducationRow = true;
    // this.store.dispatch(this.addEducation({ experience }));
  }

  deleteEducation(education: IEducation) {
    this.store.dispatch(removeEducation({ education }));
  }

  cancelEducation(): void {
    this.showNewEducationRow = false;
  }

  saveEducation(): void {
    if (this.newEducationForm.valid) {
      this.store.dispatch(addEducation({ education: this.newEducationForm.value }));
      this.addEducation();
    }
  }

  goToNextSection(): void {
    this.router.navigate(['../personal-projects'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../experience'], {
      relativeTo: this.activatedRoute,
    });
  }
}
