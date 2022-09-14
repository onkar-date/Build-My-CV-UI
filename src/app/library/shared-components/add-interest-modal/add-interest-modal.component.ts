import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-interest-modal',
  templateUrl: './add-interest-modal.component.html',
  styleUrls: ['./add-interest-modal.component.scss'],
})
export class AddInterestModalComponent implements OnInit {
  interestForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.interestForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addInterest(): void {
    if (this.interestForm.valid) {
      const result: string = this.interestForm.value.name;
      this.activeModal.close(result);
    }
  }
}
