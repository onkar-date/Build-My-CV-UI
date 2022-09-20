import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';
import { AddExperienceModalComponent } from './add-experience-modal/add-experience-modal.component';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { AddEducationModalComponent } from './add-education-modal/add-education-modal.component';
import { AddCertificateModalComponent } from './add-certificate-modal/add-certificate-modal.component';
import { AddInterestModalComponent } from './add-interest-modal/add-interest-modal.component';
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component';
import { RatingComponent } from './rating/rating.component';
import { ChangeTemplateModalComponent } from './change-template-modal/change-template-modal.component';
@NgModule({
  declarations: [
    ConfirmationPromptComponent,
    AddExperienceModalComponent,
    AddProjectModalComponent,
    AddEducationModalComponent,
    AddCertificateModalComponent,
    AddInterestModalComponent,
    AddSkillModalComponent,
    RatingComponent,
    ChangeTemplateModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ConfirmationPromptComponent,
    AddExperienceModalComponent,
    AddProjectModalComponent,
    RatingComponent,
    ChangeTemplateModalComponent
  ],
})
export class SharedComponentsModule {}
