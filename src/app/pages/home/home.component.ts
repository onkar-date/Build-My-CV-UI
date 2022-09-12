import { ToasterService } from './../../shared/services/toaster.service';
import { takeUntil, Subject } from 'rxjs';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ISection,
  ISectionValidity,
} from './../../shared/interface/section.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  selectSections,
  selectSectionValidity,
} from 'src/app/state/CV-State/cv.selectors';
import { fillMockData, selectSection } from 'src/app/state/CV-State/cv.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sections$ = this.store.select(selectSections);
  sectionValidity$ = this.store.select(selectSectionValidity);
  sectionValidity!: ISectionValidity;
  destroy$ = new Subject();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private tostr: ToasterService
  ) {
    store
      .select(selectSectionValidity)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => (this.sectionValidity = _));
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  goToSection(selectedSection: ISection): void {
    if (selectedSection.id === 'summary') {
      if (this.areAllSectionsValid()) {
        this.store.dispatch(selectSection({ section: selectedSection }));
        this.router.navigate([`./${selectedSection.routerLink}`], {
          relativeTo: this.activatedRoute,
        });
      } else {
        this.tostr.error(
          'Please fill all the necessary data for mandatory sections'
        );
      }
    } else {
      this.store.dispatch(selectSection({ section: selectedSection }));
      this.router.navigate([`./${selectedSection.routerLink}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  areAllSectionsValid(): boolean {
    return Object.values(this.sectionValidity).every((_) => _ === true)
      ? true
      : false;
  }

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
