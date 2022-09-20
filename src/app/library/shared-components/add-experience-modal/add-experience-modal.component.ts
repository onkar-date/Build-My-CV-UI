import IdHelper from 'src/app/shared/helpers/id.helper';
import { IExperience } from './../../../shared/interface/experience.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss'],
})
export class AddExperienceModalComponent implements OnInit {
  @Input() experienceData: IExperience = {
    id: '',
    companyName: '',
    designation: '',
    workedFrom: '',
    workedTill: '',
    description: [],
  };
  @Input() isEdit = false;
  experienceForm!: FormGroup;
  currentlyWorking = false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm(this.experienceData);
  }

  initForm(experienceData: IExperience): void {
    this.experienceForm = this.fb.group({
      id: [experienceData.id || IdHelper.getUniqueId()],
      companyName: [experienceData.companyName, Validators.required],
      designation: [experienceData.designation, Validators.required],
      workedFrom: [experienceData.workedFrom, Validators.required],
      workedTill: [experienceData.workedTill, Validators.required],
      description: [this.formatExperienceData(experienceData.description), [Validators.required]],
    });
    const isCurrentlyWorking = this.experienceForm.controls['workedTill'].value === 'Present';
    if (isCurrentlyWorking) {
      this.currentlyWorking = true;
      this.experienceForm.controls['workedTill'].disable();
    }
  }

  addBulletPoint(event: any) {
    const bullet = '\u2022';
    const bulletWithSpace = `${bullet} `;
    const enter = 13;
    const { keyCode, target } = event;
    const { selectionStart, value } = target;

    if (keyCode === enter) {
      target.value = [...value]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join('');
      target.selectionStart = selectionStart + bulletWithSpace.length;
      target.selectionEnd = selectionStart + bulletWithSpace.length;
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  }

  addExperience(): void {
    if (this.experienceForm.valid) {
      const formValue: IExperience = this.experienceForm.getRawValue();
      formValue.description = this.formatDescription(this.experienceForm.value);
      this.activeModal.close(formValue);
    }
  }

  formatDescription(formValue: IExperience): string[] {
    return String(formValue.description)
      .replace(/\u2022 /g, '')
      .split('\n')
      .filter(Boolean);
  }

  currentlWorkingChanged(): void {
    if (this.currentlyWorking) {
      this.experienceForm.controls['workedTill'].setValue('Present');
      this.experienceForm.controls['workedTill'].disable();
    } else {
      this.experienceForm.controls['workedTill'].setValue('');
      this.experienceForm.controls['workedTill'].enable();
    }
  }

  formatExperienceData(description: string[] = []): string {
    const bullet = '\u2022';
    const bulletWithSpace = `${bullet} `;
    let formatted = '';
    description.forEach(exp => {
      formatted += `${bulletWithSpace}${exp}\n`;
    })
    return formatted;
  }
}
