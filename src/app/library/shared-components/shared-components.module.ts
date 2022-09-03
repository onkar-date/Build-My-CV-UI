import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPromptComponent } from './confirmation-prompt/confirmation-prompt.component';
@NgModule({
  declarations: [ConfirmationPromptComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [MaterialModule, ConfirmationPromptComponent],
})
export class SharedComponentsModule {}
