import { selectCVState } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss'],
})
export class Template1Component implements OnInit {
  cvData$ = this.store.select(selectCVState);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
