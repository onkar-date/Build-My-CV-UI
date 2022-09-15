import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-interest-modal',
  templateUrl: './add-interest-modal.component.html',
  styleUrls: ['./add-interest-modal.component.scss'],
})
export class AddInterestModalComponent implements OnInit {
  @Input() interest: string = '';
  @Input() isEdit = false;
  interestForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.interestForm = this.fb.group({
      name: [this.interest, Validators.required],
    });
  }

  addInterest(): void {
    if (this.interestForm.valid) {
      const result: string = this.interestForm.value.name;
      this.activeModal.close(result);
    }
  }
}
