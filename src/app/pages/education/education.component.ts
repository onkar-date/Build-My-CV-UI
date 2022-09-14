import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { AddEducationModalComponent } from './../../library/shared-components/add-education-modal/add-education-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  addEducation,
  removeEducation,
} from './../../state/CV-State/cv.actions';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { selectEducation } from './../../state/CV-State/cv.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit, OnDestroy {
  education$ = this.store.select(selectEducation);
  destroy$ = new Subject();
  sections: ISection[] = SECTIONS;
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
  }

  addEducation() {
    const modalRef = this.modal.open(AddEducationModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((education: IEducation) => {
      if (education) {
        this.store.dispatch(addEducation({ education }));
      }
    });
  }

  deleteEducation(education: IEducation) {
    this.store.dispatch(removeEducation({ education }));
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
