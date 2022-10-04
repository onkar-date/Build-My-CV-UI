import { IPersonalDetails } from './../../../shared/interface/personalDetails.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-personal-details-modal',
  templateUrl: './update-personal-details-modal.component.html',
  styleUrls: ['./update-personal-details-modal.component.scss'],
})
export class UpdatePersonalDetailsModalComponent implements OnInit {
  @Input() personalDetails: IPersonalDetails = {
    firstName: '',
    lastName: '',
    areaOfExpertise: '',
    aboutMe: '',
  };
  personalDetailsForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initPersonalDetailsForm(this.personalDetails);
  }

  initPersonalDetailsForm(personalDetails: IPersonalDetails): void {
    this.personalDetailsForm = this.fb.group({
      firstName: [personalDetails.firstName, [Validators.required]],
      lastName: [personalDetails.lastName, [Validators.required]],
      areaOfExpertise: [personalDetails.areaOfExpertise, [Validators.required]],
      aboutMe: [personalDetails.aboutMe, [Validators.required]],
    });
  }

  savePersonalDetails(): void {
    this.activeModal.close(this.personalDetailsForm.value);
  }
}
