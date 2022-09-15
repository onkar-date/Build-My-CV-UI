import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IdHelper from 'src/app/shared/helpers/id.helper';

@Component({
  selector: 'app-add-certificate-modal',
  templateUrl: './add-certificate-modal.component.html',
  styleUrls: ['./add-certificate-modal.component.scss'],
})
export class AddCertificateModalComponent implements OnInit {
  @Input() certificate: ICertificate = {
    id: IdHelper.getUniqueId(),
    title: '',
    yearOfCompletion: '',
  };
  @Input() isEdit = false;
  certificateForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.certificateForm = this.fb.group({
      id: [this.certificate.id, Validators.required],
      title: [this.certificate.title, Validators.required],
      yearOfCompletion: [this.certificate.yearOfCompletion],
    });
  }

  addCertificate(): void {
    if (this.certificateForm.valid) {
      const result: ICertificate = {
        id: this.certificateForm.value.id,
        title: this.certificateForm.value.title,
        yearOfCompletion: this.certificateForm.value.yearOfCompletion,
      };
      this.activeModal.close(result);
    }
  }
}
