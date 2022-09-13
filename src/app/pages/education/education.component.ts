import { AddEducationModalComponent } from './../../library/shared-components/add-education-modal/add-education-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit, OnDestroy {
  education$ = this.store.select(selectEducation);
  destroy$ = new Subject();
  sections: ISection[] = [];
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
    var scrollDiv = document.getElementById('sectionHeader')?.offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
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
