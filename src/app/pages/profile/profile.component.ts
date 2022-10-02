import { IProfile } from 'src/app/shared/interface/profile.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProject } from './../../shared/interface/project.interface';
import { CVState } from './../../state/CV-State/cv.reducer';
import { selectCVState } from './../../state/CV-State/cv.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { selectUserProfileData } from 'src/app/state/user-state/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData!: CVState;
  profileData$: Observable<IProfile> = this.store.select(selectUserProfileData);
  personalDetailsForm!: FormGroup;
  contactDetailsForm!: FormGroup;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.store.select(selectCVState).subscribe((cvState) => {
      this.userData = cvState;
    });
  }

  ngOnInit(): void {}

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }

  initPersonalDetailsForm(): void {
    this.personalDetailsForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      primaryRole: [null, [Validators.required]],
      aboutMe: [null, [Validators.required]],
    });
  }
}
