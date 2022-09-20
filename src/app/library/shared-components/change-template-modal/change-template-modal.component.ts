import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TEMPLATES } from 'src/app/shared/constants/templates.constants';
import { ITemplate } from 'src/app/shared/interface/template.interface';
import { AppState } from 'src/app/state/app.state';
import { selectTemplate } from 'src/app/state/CV-State/cv.selectors';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-change-template-modal',
  templateUrl: './change-template-modal.component.html',
  styleUrls: ['./change-template-modal.component.scss']
})
export class ChangeTemplateModalComponent implements OnInit {

  destroy$ = new Subject();
  templates = TEMPLATES;
  selectedTemplate!: ITemplate;
  constructor(public activeModal: NgbActiveModal, private store: Store<AppState>) {
    this.store
    .select(selectTemplate)
    .pipe(takeUntil(this.destroy$))
    .subscribe((template: ITemplate) => {
      this.selectedTemplate = template;
    });
  }

  ngOnInit(): void {
  }

  selectTemplate(): void {
    this.activeModal.close(this.selectedTemplate);
  }

  setTemplate(template: ITemplate): void {
    this.selectedTemplate = template;
  }

}
