import { ICertificate } from './../../shared/interface/certificate.interface';
import { selectCertificates } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { AppState } from 'src/app/state/app.state';
import {
  removeEducation,
  addEducation,
  removeCertificate,
  addCertificate,
} from 'src/app/state/CV-State/cv.actions';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates$ = this.store.select(selectCertificates);
  certificateForm!: FormGroup;
  showNewCertificateRow = false;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
    this.router.navigate(['../templates'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../personal-projects'], {
      relativeTo: this.activatedRoute,
    });
  }
}
