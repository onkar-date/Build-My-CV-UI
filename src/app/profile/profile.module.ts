import { SharedComponentsModule } from './../library/shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './../library/material/material.module';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePersonalDetailsComponent } from './profile-personal-details/profile-personal-details.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';
import { ProfileSkillsComponent } from './profile-skills/profile-skills.component';
import { ProfileEducationComponent } from './profile-education/profile-education.component';
import { ProfileProjectsComponent } from './profile-projects/profile-projects.component';
import { ProfileCertificatesComponent } from './profile-certificates/profile-certificates.component';
import { ProfileInterestsComponent } from './profile-interests/profile-interests.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfilePersonalDetailsComponent,
    ProfileExperienceComponent,
    ProfileSkillsComponent,
    ProfileEducationComponent,
    ProfileProjectsComponent,
    ProfileCertificatesComponent,
    ProfileInterestsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    SharedComponentsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
