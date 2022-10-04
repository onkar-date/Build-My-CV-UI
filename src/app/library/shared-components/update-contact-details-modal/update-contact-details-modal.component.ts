import { IContactDetails } from './../../../shared/interface/contactDetails.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-contact-details-modal',
  templateUrl: './update-contact-details-modal.component.html',
  styleUrls: ['./update-contact-details-modal.component.scss'],
})
export class UpdateContactDetailsModalComponent implements OnInit {
  @Input() contactDetails: IContactDetails = {
    mobile: '',
    email: '',
    linkedIn: '',
    address: '',
  };
  contactDetailsForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initcontactDetailsForm(this.contactDetails);
  }

  initcontactDetailsForm(contactDetails: IContactDetails): void {
    this.contactDetailsForm = this.fb.group({
      mobile: [contactDetails.mobile, [Validators.required]],
      email: [contactDetails.email, [Validators.required]],
      linkedIn: [contactDetails.linkedIn, [Validators.required]],
      address: [contactDetails.address, [Validators.required]],
    });
  }

  savecontactDetails(): void {
    this.activeModal.close(this.contactDetailsForm.value);
  }
}
