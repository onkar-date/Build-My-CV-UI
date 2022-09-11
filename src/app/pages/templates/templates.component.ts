import { ToasterService } from './../../shared/services/toaster.service';
import {
  finalizeTemplate,
  selectSection,
  upadateSectionValidity,
} from './../../state/CV-State/cv.actions';
import { TEMPLATES } from './../../shared/constants/templates.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ITemplate } from 'src/app/shared/interface/template.interface';
import {
  selectSections,
  selectSectionValidity,
  selectTemplate,
} from 'src/app/state/CV-State/cv.selectors';
import { takeUntil, Subject } from 'rxjs';
import {
  ISection,
  ISectionValidity,
} from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates = TEMPLATES;
  destroy$ = new Subject();
  sections: ISection[] = [];
  selectedTemplate!: ITemplate;
  sectionValidity!: ISectionValidity;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tostr: ToasterService
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
    store
      .select(selectSectionValidity)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sectionValidity: ISectionValidity) => {
        this.sectionValidity = sectionValidity;
      });
    store
      .select(selectTemplate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedTemplate: ITemplate) => {
        this.selectedTemplate = selectedTemplate;
      });
  }

  ngOnInit(): void {}

  showSummary(): void {
    if (this.areAllSectionsValid()) {
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].active) {
          this.store.dispatch(selectSection({ section: this.sections[i + 1] }));
          this.router.navigate([`../${this.sections[i + 1].routerLink}`], {
            relativeTo: this.activatedRoute,
          });
          break;
        }
      }
    } else {
      this.tostr.error(
        'Please fill all the necessary data for mandatory sections'
      );
    }
  }

  areAllSectionsValid(): boolean {
    return Object.values(this.sectionValidity).every(_ => _ === true) ? true : false;
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
    this.selectedTemplate = template;
    this.store.dispatch(finalizeTemplate({ template: this.selectedTemplate }));
    this.store.dispatch(
      upadateSectionValidity({ sectionKey: 'template', validity: true })
    );
  }
}
