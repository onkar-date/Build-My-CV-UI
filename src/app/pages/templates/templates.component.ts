import {
  finalizeTemplate,
  selectSection,
} from './../../state/CV-State/cv.actions';
import { TEMPLATES } from './../../shared/constants/templates.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ITemplate } from 'src/app/shared/interface/template.interface';
import { selectSections } from 'src/app/state/CV-State/cv.selectors';
import { takeUntil, Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates = TEMPLATES;
  destroy$ = new Subject();
  sections: ISection[] = [];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
  }

  ngOnInit(): void {}

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

  selectTemplate(template: ITemplate) {
    this.store.dispatch(finalizeTemplate({ template }));
    this.goToNextSection();
  }
}
