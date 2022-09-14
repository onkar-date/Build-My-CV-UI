import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-certificate-modal',
  templateUrl: './add-certificate-modal.component.html',
  styleUrls: ['./add-certificate-modal.component.scss'],
})
export class AddCertificateModalComponent implements OnInit {
  certificateForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.certificateForm = this.fb.group({
      title: ['', Validators.required],
      yearOfCompletion: ['']
    });
  }

  ngOnInit(): void {}

  addCertificate(): void {
    if (this.certificateForm.valid) {
      const result: ICertificate = {
        title: this.certificateForm.value.title,
        yearOfCompletion: this.certificateForm.value.yearOfCompletion
      }
      this.activeModal.close(result);
    }
  }
}
