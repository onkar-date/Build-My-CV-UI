import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';
import { AddExperienceModalComponent } from './add-experience-modal/add-experience-modal.component';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
@NgModule({
  declarations: [
    ConfirmationPromptComponent,
    AddExperienceModalComponent,
    AddProjectModalComponent
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
  ],
})
export class SharedComponentsModule {}