import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss'],
})
export class AddExperienceModalComponent implements OnInit {
  experienceForm!: FormGroup;
  experienceData = null;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      companyName: ['Infosys', Validators.required],
      designation: ['Systems Engineer', Validators.required],
      workedFrom: [new Date(), Validators.required],
      workedTill: [new Date(), Validators.required],
      description: ['Working on developing a CPQ (Configure Price Quote) application For Thyssenkrupp Elevators using Angular 11', Validators.required],
    });
  }

  addExperience(): void {
    if (this.experienceForm.valid) {
      this.activeModal.close(this.experienceForm.value);
    }
  }
}
