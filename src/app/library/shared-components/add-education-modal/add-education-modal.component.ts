import { IEducation } from 'src/app/shared/interface/education.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IdHelper from 'src/app/shared/helpers/id.helper';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss'],
})
export class AddEducationModalComponent implements OnInit {
  @Input() education: IEducation = {
    id: '',
    degree: '',
    batch: '',
    university: '',
  };
  @Input() isEdit = false;
  educationForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      id: [this.education.id || IdHelper.getUniqueId(), Validators.required],
      degree: [this.education.degree, Validators.required],
      batch: [this.education.batch, Validators.required],
      university: [this.education.university, Validators.required],
    });
  }

  addEducation(): void {
    if (this.educationForm.valid) {
      const result: IEducation = {
        id: this.educationForm.value.id,
        degree: this.educationForm.value.degree,
        batch: this.educationForm.value.batch,
        university: this.educationForm.value.university,
      };
      this.activeModal.close(result);
    }
  }
}
