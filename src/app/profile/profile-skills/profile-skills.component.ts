import { selectUserProfileSkills } from './../../state/user-state/user.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AddSkillModalComponent } from 'src/app/library/shared-components/add-skill-modal/add-skill-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { ISkill } from 'src/app/shared/interface/skills.interface';
import {
  updateSkill,
  deleteSkill,
  addSkill
} from 'src/app/state/user-state/user.actions';
import { IUser } from 'src/app/shared/interface/user.interface';
import { selectUserData } from 'src/app/state/user-state/user.selectors';

@Component({
  selector: 'app-profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.scss'],
})
export class ProfileSkillsComponent implements OnInit {
  userData!: IUser;
  skills$ = this.store.select(selectUserProfileSkills);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  addEditSkill(skill: ISkill | null, event: Event, edit: boolean): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddSkillModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit && skill) {
      modal.componentInstance.skill = skill;
      modal.componentInstance.currentRating = skill.rating;
    }
    modal.result.then((skillData: ISkill) => {
      if (skillData) {
        if (edit) {
          this.store.dispatch(
            updateSkill({
              userId: this.getUserId(),
              skill: skillData,
            })
          );
        } else {
          this.store.dispatch(
            addSkill({ userId: this.getUserId(), skill: skillData })
          );
        }
      }
    });
  }

  async deleteSkill(skill: ISkill, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete skill ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete skill ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteSkill({ userId: this.getUserId(), skillId: skill.id })
      );
    }
  }

  getUserId(): string {
    return this.userData.userId;
  }
}
