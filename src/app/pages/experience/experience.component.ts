import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { Subject, takeUntil } from 'rxjs';
import { removeExperience } from './../../state/CV-State/cv.actions';
import { selectExperiences } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { IExperience } from './../../shared/interface/experience.interface';
import { AddExperienceModalComponent } from './../../library/shared-components/add-experience-modal/add-experience-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addExperience } from 'src/app/state/CV-State/cv.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experiences$ = this.store.select(selectExperiences);
  sections: ISection[] = SECTIONS;
  destroy$ = new Subject();
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addExperience() {
    const modal = this.modalService.open(AddExperienceModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modal.result.then((experience: IExperience) => {
      if (experience) {
        this.store.dispatch(addExperience({ experience }));
      }
    });
  }

  deleteExperience(experience: IExperience) {
    this.store.dispatch(removeExperience({ experience }));
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
