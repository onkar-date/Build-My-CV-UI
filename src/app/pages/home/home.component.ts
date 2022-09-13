import { takeUntil, Subject } from 'rxjs';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import {
  ISectionValidity,
} from './../../shared/interface/section.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  selectCVState,
  selectSections,
  selectTemplate,
} from 'src/app/state/CV-State/cv.selectors';
import { fillMockData } from 'src/app/state/CV-State/cv.actions';
import { ITemplate } from 'src/app/shared/interface/template.interface';
import { CVState } from 'src/app/state/CV-State/cv.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sections$ = this.store.select(selectSections);
  sectionValidity!: ISectionValidity;
  selectedTemplate!: ITemplate;
  destroy$ = new Subject();
  cvData!: CVState;
  constructor(
    private store: Store<AppState>  ) {
    this.store
      .select(selectTemplate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((template: ITemplate) => {
        this.selectedTemplate = template;
      });
    this.store
      .select(selectCVState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cvData: CVState) => {
        this.cvData = cvData;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  toggleMenu(): void {
    const toggle = document.querySelector('.toggle');
    toggle?.classList.toggle('active');
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
    const mainContent = document.querySelector('.main-content');
    mainContent?.classList.toggle('active');
  }

  fillMockData(): void {
    this.store.dispatch(fillMockData());
  }
}
