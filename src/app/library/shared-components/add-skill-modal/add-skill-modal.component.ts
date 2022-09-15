import { ISkill } from './../../../shared/interface/skills.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IdHelper from 'src/app/shared/helpers/id.helper';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.scss'],
})
export class AddSkillModalComponent implements OnInit {
  @Input() skill: ISkill = {
    id: '',
    name: '',
    rating: 0,
  };
  @Input() isEdit = false;
  @Input() currentRating = 0;
  skillForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name: [this.skill.name, Validators.required],
      rating: [this.skill.rating, [Validators.required, Validators.max(5)]],
    });
  }

  addSkill(): void {
    if (this.skillForm.valid) {
      const result: ISkill = {
        id: this.skill.id || IdHelper.getUniqueId(),
        name: this.skillForm.value.name,
        rating: this.skillForm.value.rating,
      };
      this.activeModal.close(result);
    }
  }

  updateRating(rating: number): void {
    this.skillForm.controls['rating'].setValue(rating);
  }
}
