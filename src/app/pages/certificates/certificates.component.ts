import { editCertificate } from './../../state/CV-State/cv.actions';
import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { AddCertificateModalComponent } from './../../library/shared-components/add-certificate-modal/add-certificate-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICertificate } from './../../shared/interface/certificate.interface';
import { selectCertificates } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  removeCertificate,
  addCertificate,
} from 'src/app/state/CV-State/cv.actions';
import { Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  certificates$ = this.store.select(selectCertificates);
  sections: ISection[] = SECTIONS;
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addEditCertificate(certificate?: ICertificate) {
    const modalRef = this.modal.open(AddCertificateModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    if (certificate) {
      modalRef.componentInstance.isEdit = true;
      modalRef.componentInstance.certificate = certificate;
    }
    modalRef.result.then((updatedCertificate: ICertificate) => {
      if (updatedCertificate) {
        if (certificate) {
          this.store.dispatch(
            editCertificate({ certificate: updatedCertificate })
          );
        } else {
          this.store.dispatch(
            addCertificate({ certificate: updatedCertificate })
          );
        }
      }
    });
  }

  deleteCertificate(certificate: ICertificate) {
    this.store.dispatch(removeCertificate({ certificate }));
  }

  goToNextSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.nextSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  goToPreviousSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.previousSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }
}
