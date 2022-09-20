import { Router } from '@angular/router';
import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { ISection } from 'src/app/shared/interface/section.interface';
import { takeUntil, Subject } from 'rxjs';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  selectCVState,
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
  sections: ISection[] = SECTIONS;
  selectedTemplate!: ITemplate;
  destroy$ = new Subject();
  cvData!: CVState;
  constructor(private store: Store<AppState>, private router: Router) {
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

  showTemplates(): void {
    this.router.navigate(['templates'])
  }
}
