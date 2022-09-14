import { AddSkillModalComponent } from './../../library/shared-components/add-skill-modal/add-skill-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  sections: ISection[] = [];
  skills$ = this.store.select(selectSkills);
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.routeToCurrentSection();
  }

  routeToCurrentSection(): void {}

  addSkill(): void {
    const modalRef = this.modal.open(AddSkillModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((skill: ISkill) => {
      if (skill) {
        this.store.dispatch(addSkill({ skill }));
      }
    });
  }

  deleteSkill(skill: ISkill): void {
    this.store.dispatch(removeSkill({ name: skill.name }));
  }

  goToNextSection(): void {
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
