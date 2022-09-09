import { ICertificate } from './../../shared/interface/certificate.interface';
import { selectCertificates, selectSections } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  removeCertificate,
  addCertificate,
  selectSection,
} from 'src/app/state/CV-State/cv.actions';
import { takeUntil, Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates$ = this.store.select(selectCertificates);
  certificateForm!: FormGroup;
  showNewCertificateRow = false;
  sections: ISection[] = [];
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
  }

  ngOnInit(): void {}

  addCertificate() {
    this.certificateForm = this.fb.group({
      title: ['', Validators.required],
      yearOfCompletion: [''],
    });
    this.showNewCertificateRow = true;
  }

  deleteCertificate(certificate: ICertificate) {
    this.store.dispatch(removeCertificate({ certificate }));
  }

  cancelCertificate(): void {
    this.showNewCertificateRow = false;
  }

  saveCertificate(): void {
    if (this.certificateForm.valid) {
      this.store.dispatch(
        addCertificate({ certificate: this.certificateForm.value })
      );
      this.addCertificate();
    }
  }

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
}
