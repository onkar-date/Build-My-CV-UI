import { AddCertificateModalComponent } from './../../library/shared-components/add-certificate-modal/add-certificate-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICertificate } from './../../shared/interface/certificate.interface';
import { selectCertificates, selectSections } from './../../state/CV-State/cv.selectors';
import { Component, OnInit } from '@angular/core';
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
  sections: ISection[] = [];
  destroy$ = new Subject();
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addCertificate() {
    const modalRef = this.modal.open(AddCertificateModalComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((certificate: ICertificate) => {
      if (certificate) {
        this.store.dispatch(addCertificate({ certificate }));
      }
    });
  }

  deleteCertificate(certificate: ICertificate) {
    this.store.dispatch(removeCertificate({ certificate }));
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
