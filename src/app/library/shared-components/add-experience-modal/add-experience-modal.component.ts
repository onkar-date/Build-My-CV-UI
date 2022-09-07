import { IExperience } from './../../../shared/interface/experience.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import DateHelper from 'src/app/shared/helpers/date.helper';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss'],
})
export class AddExperienceModalComponent implements OnInit {
  experienceForm!: FormGroup;
  experienceData = null;
  val = [''];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      companyName: ['Infosys', Validators.required],
      designation: ['Systems Engineer', Validators.required],
      workedFrom: ['', Validators.required],
      workedTill: ['', Validators.required],
      description: [['adadd'], [Validators.required]],
    });
  }

  addBulletPoint(event: any) {
    const bullet = '\u2022';
    const bulletWithSpace = `${bullet} `;
    const enter = 13;
    const { keyCode, target } = event;
    const { selectionStart, value } = target;

    if (keyCode === enter) {
      console.log('a');
      target.value = [...value]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join('');
      console.log(target.value);

      target.selectionStart = selectionStart + bulletWithSpace.length;
      target.selectionEnd = selectionStart + bulletWithSpace.length;
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  }

  addExperience(): void {
    if (this.experienceForm.valid) {
      const formValue: IExperience = this.experienceForm.value;
      formValue.description = this.formatDescription(this.experienceForm.value);
      formValue.workedFrom = DateHelper.formatToMonthAndYear(formValue.workedFrom);
      formValue.workedTill = DateHelper.formatToMonthAndYear(formValue.workedTill);
      console.log(formValue);
      
      this.activeModal.close(formValue);
    }
  }

  formatDescription(formValue: IExperience): string[] {
    return String(formValue.description)
      .replace(/\u2022 /g, '')
      .split('\n')
      .filter(Boolean);
  }
}
