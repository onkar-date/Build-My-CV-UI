import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { AddSkillModalComponent } from './../../library/shared-components/add-skill-modal/add-skill-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ISkill } from './../../shared/interface/skills.interface';
import { selectSkills } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { addSkill, removeSkill } from 'src/app/state/CV-State/cv.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  sections: ISection[] = SECTIONS;
  skills$ = this.store.select(selectSkills);
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}

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
