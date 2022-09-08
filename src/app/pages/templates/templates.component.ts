import { finalizeTemplate } from './../../state/CV-State/cv.actions';
import { TEMPLATES } from './../../shared/constants/templates.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ITemplate } from 'src/app/shared/interface/template.interface';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates = TEMPLATES;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToNextSection(): void {
    this.router.navigate(['../summary'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../certificates'], {
      relativeTo: this.activatedRoute,
    });
  }

  selectTemplate(template: ITemplate) {
    this.store.dispatch(finalizeTemplate({ template }));
    this.goToNextSection();
  }
}
