import { IProject } from './../../../shared/interface/project.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IdHelper from 'src/app/shared/helpers/id.helper';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {
  projectForm!: FormGroup;
  @Input() project: IProject = {
    id: '',
    title: '',
    description: '',
    link: '',
  };
  @Input() isEdit = false;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      id: [this.project.id || IdHelper.getUniqueId(), Validators.required],
      title: [this.project.title, Validators.required],
      description: [this.project.description, Validators.required],
      link: [this.project.link],
    });
  }

  addProject(): void {
    if (this.projectForm.valid) {
      this.activeModal.close(this.projectForm.value);
    }
  }
}
