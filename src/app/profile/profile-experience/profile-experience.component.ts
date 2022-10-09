import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AddExperienceModalComponent } from 'src/app/library/shared-components/add-experience-modal/add-experience-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { IExperience } from 'src/app/shared/interface/experience.interface';
import { AppState } from 'src/app/state/app.state';
import { addExperience, deleteExperience, updateExperience } from 'src/app/state/user-state/user.actions';
import { IUser } from 'src/app/shared/interface/user.interface';
import { selectUserData, selectUserProfileExperience } from 'src/app/state/user-state/user.selectors';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {

  userData!: IUser;
  experienceDetails$ = this.store.select(selectUserProfileExperience);
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>
  ) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {
  }

  addEditExperience(
    experience: IExperience | null,
    event: Event,
    edit: boolean
  ): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddExperienceModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.experienceData = experience;
    }
    modal.result.then((expData: IExperience) => {
      if (expData) {
        if (edit) {
          this.store.dispatch(
            updateExperience({
              userId: this.getUserId(),
              experience: expData,
            })
          );
        } else {
          this.store.dispatch(
            addExperience({ userId: this.getUserId(), experience: expData })
          );
        }
      }
    });
  }

  async deleteExperience(experience: IExperience, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete Experience ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete experience ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteExperience({ userId: this.getUserId(), expId: experience.id })
      );
    }
  }

  getUserId(): string {
    return this.userData.userId;
  }

}
