import { ToasterService } from './../../shared/services/toaster.service';
import { Subject, takeUntil } from 'rxjs';
import { ISkill } from './../../shared/interface/skills.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  selectSections,
  selectSkills,
} from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  addSkill,
  removeSkill,
  selectSection,
} from 'src/app/state/CV-State/cv.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  initialRating = 0;
  newSkillForm!: FormGroup;
  showNewSkillRow = false;
  skills: ISkill[] = [];
  sections: ISection[] = [];
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
    store
      .select(selectSkills)
      .pipe(takeUntil(this.destroy$))
      .subscribe((skills: ISkill[]) => {
        this.skills = skills;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.routeToCurrentSection();
  }

  routeToCurrentSection(): void {}

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
    if (this.skills.length) {
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
      this.toastr.error('Please enter atleast 1 skill !!');
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
