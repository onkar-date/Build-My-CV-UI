import { IProject } from './../../shared/interface/project.interface';
import { CVState } from './../../state/CV-State/cv.reducer';
import { selectCVState } from './../../state/CV-State/cv.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData!: CVState;
  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(selectCVState).subscribe(cvState => {
      this.userData = cvState;
    })
  }

  ngOnInit(): void {
  }

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }
}
