import { AddEducationModalComponent } from './../../library/shared-components/add-education-modal/add-education-modal.component';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { ConfirmationPromptComponent } from './../../library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { AddExperienceModalComponent } from './../../library/shared-components/add-experience-modal/add-experience-modal.component';
import { IExperience } from './../../shared/interface/experience.interface';
import { UpdateContactDetailsModalComponent } from './../../library/shared-components/update-contact-details-modal/update-contact-details-modal.component';
import { IContactDetails } from './../../shared/interface/contactDetails.interface';
import { selectUserData } from './../../state/user-state/user.selectors';
import { IUser } from './../../shared/interface/user.interface';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import { UpdatePersonalDetailsModalComponent } from './../../library/shared-components/update-personal-details-modal/update-personal-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProfile } from 'src/app/shared/interface/profile.interface';
import { Observable } from 'rxjs';
import { IProject } from './../../shared/interface/project.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { selectUserProfileData } from 'src/app/state/user-state/user.selectors';
import {
  addCertificate,
  addEducation,
  addExperience,
  addInterest,
  addProject,
  addSkill,
  deleteCertificate,
  deleteEducation,
  deleteExperience,
  deleteInterest,
  deleteProject,
  deleteSkill,
  updateCertificate,
  updateContactDetails,
  updateEducation,
  updateExperience,
  updateInterest,
  updatePersonalDetails,
  updateProject,
  updateSkill,
} from 'src/app/state/user-state/user.actions';
import { AddProjectModalComponent } from 'src/app/library/shared-components/add-project-modal/add-project-modal.component';
import { AddCertificateModalComponent } from 'src/app/library/shared-components/add-certificate-modal/add-certificate-modal.component';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { AddSkillModalComponent } from 'src/app/library/shared-components/add-skill-modal/add-skill-modal.component';
import { ISkill } from 'src/app/shared/interface/skills.interface';
import * as $ from 'jquery';
import { AddInterestModalComponent } from 'src/app/library/shared-components/add-interest-modal/add-interest-modal.component';
import { Interest } from 'src/app/shared/interface/interest.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData!: IUser;
  profileData$: Observable<IProfile> = this.store.select(selectUserProfileData);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }

  editPersonalDetails(personalDetails: IPersonalDetails): void {
    const modal = this.modalService.open(UpdatePersonalDetailsModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modal.componentInstance.personalDetails = personalDetails;
    modal.result.then((updatedPersonalDetails: IPersonalDetails) => {
      if (updatedPersonalDetails) {
        this.store.dispatch(
          updatePersonalDetails({
            userId: this.getUserId(),
            personalDetails: updatedPersonalDetails,
          })
        );
      }
    });
  }

  editContactDetails(contactDetails: IContactDetails): void {
    const modal = this.modalService.open(UpdateContactDetailsModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modal.componentInstance.contactDetails = contactDetails;
    modal.result.then((updatedcontactDetails: IContactDetails) => {
      if (updatedcontactDetails) {
        this.store.dispatch(
          updateContactDetails({
            userId: this.getUserId(),
            contactDetails: updatedcontactDetails,
          })
        );
      }
    });
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

  addEditProject(project: IProject | null, event: Event, edit: boolean): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddProjectModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.project = project;
    }
    modal.result.then((projectData: IProject) => {
      if (projectData) {
        if (edit) {
          this.store.dispatch(
            updateProject({
              userId: this.getUserId(),
              project: projectData,
            })
          );
        } else {
          this.store.dispatch(
            addProject({ userId: this.getUserId(), project: projectData })
          );
        }
      }
    });
  }

  async deleteProject(project: IProject, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete Project ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete Project ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteProject({ userId: this.getUserId(), projectId: project.id })
      );
    }
  }

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

  async deleteInterest(
    interest: Interest,
    event: Event
  ): Promise<void> {
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
