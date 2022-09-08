import { selectInterests } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addInterest, removeInterest } from 'src/app/state/CV-State/cv.actions';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {
  interests$ = this.store.select(selectInterests);
  showNewInterestRow = false;
  newInterest: string = '';
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void { }
  
  addInterest() {
    this.newInterest = '';
    this.showNewInterestRow = true;
  }

  deleteInterest(interest: string) {
    this.store.dispatch(removeInterest({ interest }));
  }

  cancelInterest(): void {
    this.showNewInterestRow = false;
  }

  saveInterest(): void {
    if (this.newInterest.length) {
      this.store.dispatch(
        addInterest({ interest: this.newInterest })
      );
      this.addInterest();
    }
  }

  goToNextSection(): void {
    this.router.navigate(['../templates'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../certificates'], {
      relativeTo: this.activatedRoute,
    });
  }
}
