import { selectCVState } from './../../state/CV-State/cv.selectors';
import { CVState } from './../../state/CV-State/cv.reducer';
import { ResumeService } from './../../shared/services/resume.service';
import { ITemplate } from './../../shared/interface/template.interface';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectTemplate } from 'src/app/state/CV-State/cv.selectors';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  selectedTemplate!: ITemplate;
  cvData!: CVState;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectTemplate)
      .pipe(takeUntil(this.destroy$))
      .subscribe((template: ITemplate) => {
        this.selectedTemplate = template;
        console.log(this.selectedTemplate);
      });
    this.store
      .select(selectCVState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cvData: CVState) => {
        this.cvData = cvData;
        console.log(this.cvData);
      });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../templates'], {
      relativeTo: this.activatedRoute,
    });
  }

  async downloadResume() {
    const resume = await this.resumeService.downloadResume(
      this.selectedTemplate,
      this.cvData
    );
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(resume);
    downloadLink.download = `${this.cvData.personalDetails.firstName}_${this.cvData.personalDetails.lastName}`;
    downloadLink.click();
  }
}
