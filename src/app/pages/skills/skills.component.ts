import { selectSkills } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills$ = this.store.select(selectSkills);
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  addSkill(): void {
    
  }

}
