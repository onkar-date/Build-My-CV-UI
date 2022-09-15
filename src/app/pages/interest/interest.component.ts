import { editInterest } from './../../state/CV-State/cv.actions';
import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { AddInterestModalComponent } from './../../library/shared-components/add-interest-modal/add-interest-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { selectInterests } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addInterest, removeInterest } from 'src/app/state/CV-State/cv.actions';
import { Subject, takeUntil } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {
  interests$ = this.store.select(selectInterests);
  sections: ISection[] = SECTIONS;
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addEditInterest(index: number, interest?: string, ) {
    const modalRef = this.modal.open(AddInterestModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    if (interest) {
      modalRef.componentInstance.isEdit = true;
      modalRef.componentInstance.interest = interest;
    }
    modalRef.result.then((updatedInterestData: string) => {
      if (updatedInterestData) {
        if (interest) {
          this.store.dispatch(editInterest({ updatedInterest: updatedInterestData, index }));
        } else {
          this.store.dispatch(addInterest({ interest: updatedInterestData }));
        }
      }
    });
  }

  deleteInterest(interest: string) {
    this.store.dispatch(removeInterest({ interest }));
  }

  goToNextSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../../${currentSection.nextSection}`], {
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
