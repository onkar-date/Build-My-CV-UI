import { AddInterestModalComponent } from './../../library/shared-components/add-interest-modal/add-interest-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  selectInterests,
  selectSections,
} from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  addInterest,
  removeInterest,
  selectSection,
} from 'src/app/state/CV-State/cv.actions';
import { Subject, takeUntil } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {
  interests$ = this.store.select(selectInterests);
  sections: ISection[] = [];
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

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addInterest() {
    const modalRef = this.modal.open(AddInterestModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((interest: string) => {
      if (interest) {
        this.store.dispatch(addInterest({ interest }));
      }
    });
  }

  deleteInterest(interest: string) {
    this.store.dispatch(removeInterest({ interest }));
  }

  showSummary(): void {
    this.router.navigate([`../../summary`], {
      relativeTo: this.activatedRoute,
    });
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
