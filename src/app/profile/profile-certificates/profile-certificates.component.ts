import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AddCertificateModalComponent } from 'src/app/library/shared-components/add-certificate-modal/add-certificate-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { IUser } from 'src/app/shared/interface/user.interface';
import { AppState } from 'src/app/state/app.state';
import { addCertificate, updateCertificate, deleteCertificate } from 'src/app/state/user-state/user.actions';
import { selectUserData, selectUserProfileCertificates } from 'src/app/state/user-state/user.selectors';

@Component({
  selector: 'app-profile-certificates',
  templateUrl: './profile-certificates.component.html',
  styleUrls: ['./profile-certificates.component.scss'],
})
export class ProfileCertificatesComponent implements OnInit {
  userData!: IUser;
  certificates$ = this.store.select(selectUserProfileCertificates);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  addEditCertificate(
    certificate: ICertificate | null,
    event: Event,
    edit: boolean
  ): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddCertificateModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.certificate = certificate;
    }
    modal.result.then((certificateData: ICertificate) => {
      if (certificateData) {
        if (edit) {
          this.store.dispatch(
            updateCertificate({
              userId: this.getUserId(),
              certificate: certificateData,
            })
          );
        } else {
          this.store.dispatch(
            addCertificate({
              userId: this.getUserId(),
              certificate: certificateData,
            })
          );
        }
      }
    });
  }

  async deleteCertificate(
    certificate: ICertificate,
    event: Event
  ): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete Certificate ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete Certificate ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteCertificate({
          userId: this.getUserId(),
          certificateId: certificate.id,
        })
      );
    }
  }

  getUserId(): string {
    return this.userData.userId;
  }
}
