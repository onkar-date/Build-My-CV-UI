import { ISkill } from './../../../shared/interface/skills.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.scss'],
})
export class AddSkillModalComponent implements OnInit {
  initialRating = 0;
  skillForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', [Validators.required, Validators.max(5)]],
    });
  }

  ngOnInit(): void {}

  addSkill(): void {
    if (this.skillForm.valid) {
      const result: ISkill = {
        name: this.skillForm.value.name,
        rating: this.skillForm.value.rating
      };
      this.activeModal.close(result);
    }
  }

  updateRating(rating: number): void {
    this.skillForm.controls['rating'].setValue(rating);
  }
}
