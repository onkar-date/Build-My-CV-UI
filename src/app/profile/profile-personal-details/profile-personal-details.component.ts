import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddCertificateModalComponent } from 'src/app/library/shared-components/add-certificate-modal/add-certificate-modal.component';
import { AddEducationModalComponent } from 'src/app/library/shared-components/add-education-modal/add-education-modal.component';
import { AddExperienceModalComponent } from 'src/app/library/shared-components/add-experience-modal/add-experience-modal.component';
import { AddInterestModalComponent } from 'src/app/library/shared-components/add-interest-modal/add-interest-modal.component';
import { AddProjectModalComponent } from 'src/app/library/shared-components/add-project-modal/add-project-modal.component';
import { AddSkillModalComponent } from 'src/app/library/shared-components/add-skill-modal/add-skill-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { UpdateContactDetailsModalComponent } from 'src/app/library/shared-components/update-contact-details-modal/update-contact-details-modal.component';
import { UpdatePersonalDetailsModalComponent } from 'src/app/library/shared-components/update-personal-details-modal/update-personal-details-modal.component';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { IContactDetails } from 'src/app/shared/interface/contactDetails.interface';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { IExperience } from 'src/app/shared/interface/experience.interface';
import { Interest } from 'src/app/shared/interface/interest.interface';
import { IPersonalDetails } from 'src/app/shared/interface/personalDetails.interface';
import { IProfile } from 'src/app/shared/interface/profile.interface';
import { IProject } from 'src/app/shared/interface/project.interface';
import { ISkill } from 'src/app/shared/interface/skills.interface';
import { IUser } from 'src/app/shared/interface/user.interface';
import { AppState } from 'src/app/state/app.state';
import { updatePersonalDetails, updateContactDetails, updateExperience, deleteExperience, updateEducation, deleteEducation, updateSkill, deleteSkill, updateProject, deleteProject, updateCertificate, deleteCertificate, updateInterest, deleteInterest, addExperience, addCertificate, addEducation, addInterest, addProject, addSkill } from 'src/app/state/user-state/user.actions';
import { selectUserProfileData, selectUserData } from 'src/app/state/user-state/user.selectors';

@Component({
  selector: 'app-profile-personal-details',
  templateUrl: './profile-personal-details.component.html',
  styleUrls: ['./profile-personal-details.component.scss'],
})
export class ProfilePersonalDetailsComponent implements OnInit {
  userData!: IUser;
  profileData$: Observable<IProfile> = this.store.select(selectUserProfileData);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

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

  getUserId(): string {
    return this.userData.userId;
  }
}
