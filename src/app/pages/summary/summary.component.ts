import {
  selectCVState,
  selectSections,
} from './../../state/CV-State/cv.selectors';
import { CVState } from './../../state/CV-State/cv.reducer';
import { ResumeService } from './../../shared/services/resume.service';
import { ITemplate } from './../../shared/interface/template.interface';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectTemplate } from 'src/app/state/CV-State/cv.selectors';
import { selectSection } from 'src/app/state/CV-State/cv.actions';
import { ISection } from 'src/app/shared/interface/section.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  selectedTemplate!: ITemplate;
  cvData!: CVState;
  sections: ISection[] = [];
  isSummary = false;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
    if (router.url.split('/').pop() === 'summary') {
      this.isSummary = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  goToPreviousSection(): void {
    this.router.navigate([`../home/interests`], {
      relativeTo: this.activatedRoute,
    });
  }

  async downloadResume() {
    try {
      this.spinner.show();
      const resume = await this.resumeService.downloadResume(
        this.selectedTemplate,
        this.cvData
      );
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(resume);
      downloadLink.download = `${this.cvData.personalDetails.firstName}_${this.cvData.personalDetails.lastName}`;
      downloadLink.click();
      this.spinner.hide();
    } catch (err) {
      this.spinner.hide();
      throw err;
    }
  }
}
