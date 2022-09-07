import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { selectSkills } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { addSkill, removeSkill } from 'src/app/state/CV-State/cv.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  initialRating = 0;
  newSkillForm!: FormGroup;
  showNewSkillRow = true;
  skills$ = this.store.select(selectSkills);
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.addSkill();
  }

  ngOnInit(): void {}

  addSkill(): void {
    this.newSkillForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0, [Validators.required, Validators.max(5)]],
    });
    this.showNewSkillRow = true;
  }

  cancelSkill(): void {
    this.showNewSkillRow = false;
  }

  saveSkill(): void {
    if (this.newSkillForm.valid) {
      this.store.dispatch(addSkill({ skill: this.newSkillForm.value }));
      this.addSkill();
    }
  }

  removeSkill(name: string): void {
    this.store.dispatch(removeSkill({ name }));
  }

  goToNextSection(): void {
    this.router.navigate(['../experience'], { relativeTo: this.activatedRoute });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../personal-details'], { relativeTo: this.activatedRoute });
  }
}
