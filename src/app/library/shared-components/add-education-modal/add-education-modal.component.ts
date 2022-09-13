import { IEducation } from 'src/app/shared/interface/education.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss'],
})
export class AddEducationModalComponent implements OnInit {
  educationForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.educationForm = fb.group({
      degree: ['', Validators.required],
      batch: ['', Validators.required],
      university: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addEducation(): void {
    if (this.educationForm.valid) {
      const result: IEducation = {
        degree: this.educationForm.value.degree,
        batch: this.educationForm.value.batch,
        university: this.educationForm.value.university,
      };
      this.activeModal.close(result);
    }
  }
}
