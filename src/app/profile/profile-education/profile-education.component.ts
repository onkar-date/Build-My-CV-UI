import { selectUserProfileEducation } from './../../state/user-state/user.selectors';
import { IUser } from './../../shared/interface/user.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectUserData } from 'src/app/state/user-state/user.selectors';
import { AddEducationModalComponent } from 'src/app/library/shared-components/add-education-modal/add-education-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { addEducation, updateEducation, deleteEducation } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.scss'],
})
export class ProfileEducationComponent implements OnInit {
  userData!: IUser;
  educationDetails$ = this.store.select(selectUserProfileEducation);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  addEditEducation(
    education: IEducation | null,
    event: Event,
    edit: boolean
  ): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddEducationModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.education = education;
    }
    modal.result.then((educationData: IEducation) => {
      if (educationData) {
        if (edit) {
          this.store.dispatch(
            updateEducation({
              userId: this.getUserId(),
              education: educationData,
            })
          );
        } else {
          this.store.dispatch(
            addEducation({ userId: this.getUserId(), education: educationData })
          );
        }
      }
    });
  }

  async deleteEducation(education: IEducation, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete Education ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete Education ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteEducation({ userId: this.getUserId(), educationId: education.id })
      );
    }
  }

  getUserId(): string {
    return this.userData.userId;
  }
}
