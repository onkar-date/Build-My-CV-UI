import { ProfileInterestsComponent } from './profile-interests/profile-interests.component';
import { ProfileCertificatesComponent } from './profile-certificates/profile-certificates.component';
import { ProfileProjectsComponent } from './profile-projects/profile-projects.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileSkillsComponent } from './profile-skills/profile-skills.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';
import { ProfilePersonalDetailsComponent } from './profile-personal-details/profile-personal-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../shared/guards/can-activate.guard';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: 'personal-details',
        component: ProfilePersonalDetailsComponent
      },
      {
        path: 'experience',
        component: ProfileExperienceComponent
      },
      {
        path: 'skills',
        component: ProfileSkillsComponent
      },
      {
        path: 'education',
        component: ProfileEducationComponent
      },
      {
        path: 'projects',
        component: ProfileProjectsComponent
      },
      {
        path: 'certificates',
        component: ProfileCertificatesComponent
      },
      {
        path: 'interests',
        component: ProfileInterestsComponent
      },
      {
        path: '**',
        redirectTo: 'personal-details'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
