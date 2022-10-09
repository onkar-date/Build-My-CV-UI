import { selectUserData, selectUserProfileInterests } from './../../state/user-state/user.selectors';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AddInterestModalComponent } from 'src/app/library/shared-components/add-interest-modal/add-interest-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { Interest } from 'src/app/shared/interface/interest.interface';
import { IUser } from 'src/app/shared/interface/user.interface';
import { AppState } from 'src/app/state/app.state';
import { addInterest, updateInterest, deleteInterest } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-profile-interests',
  templateUrl: './profile-interests.component.html',
  styleUrls: ['./profile-interests.component.scss']
})
export class ProfileInterestsComponent implements OnInit {

  userData!: IUser;
  interests$ = this.store.select(selectUserProfileInterests);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  addEditInterest(
    interest: Interest | null,
    event: Event,
    edit: boolean
  ): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddInterestModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.interest = interest;
    }
    modal.result.then((interestData: Interest) => {
      if (interestData) {
        if (edit) {
          this.store.dispatch(
            updateInterest({
              userId: this.getUserId(),
              interest: interestData,
            })
          );
        } else {
          this.store.dispatch(
            addInterest({
              userId: this.getUserId(),
              interest: interestData,
            })
          );
        }
      }
    });
  }

  async deleteInterest(interest: Interest, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete interest ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete interest ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteInterest({
          userId: this.getUserId(),
          interestId: interest.id,
        })
      );
    }
  }

  getUserId(): string {
    return this.userData.userId;
  }

}
