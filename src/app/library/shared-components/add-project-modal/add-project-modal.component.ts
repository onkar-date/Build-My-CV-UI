import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {
  projectForm!: FormGroup;
  projectData = null;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['Infosys', Validators.required],
      description: ['Systems Engineer', Validators.required],
      link: [''],
    });
  }

  addProject(): void {
    if (this.projectForm.valid) {
      this.activeModal.close(this.projectForm.value);
    }
  }
}
