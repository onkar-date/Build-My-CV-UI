import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { ToasterService } from './../../shared/services/toaster.service';
import { finalizeTemplate } from './../../state/CV-State/cv.actions';
import { TEMPLATES } from './../../shared/constants/templates.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ITemplate } from 'src/app/shared/interface/template.interface';
import { selectTemplate } from 'src/app/state/CV-State/cv.selectors';
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
  sections: ISection[] = SECTIONS;
  selectedTemplate!: ITemplate;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    store
      .select(selectTemplate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedTemplate: ITemplate) => {
        this.selectedTemplate = selectedTemplate;
      });
  }

  ngOnInit(): void {}

  selectTemplate(template: ITemplate) {
    this.selectedTemplate = template;
    this.store.dispatch(finalizeTemplate({ template: this.selectedTemplate }));
    this.router.navigate([`../home/personal-details`], {
      relativeTo: this.activatedRoute,
    });
  }
}
