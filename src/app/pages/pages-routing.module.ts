import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { InterestComponent } from './interest/interest.component';
import { TemplatesComponent } from './templates/templates.component';
import { SummaryComponent } from './summary/summary.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { HomeComponent } from './home/home.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { PersonalProjectsComponent } from './personal-projects/personal-projects.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'personal-details',
        component: PersonalDetailsComponent,
      },
      {
        path: 'contact-details',
        component: ContactDetailsComponent,
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
      {
        path: 'experience',
        component: ExperienceComponent,
      },
      {
        path: 'skills',
        component: SkillsComponent,
      },
      {
        path: 'education',
        component: EducationComponent,
      },
      {
        path: 'personal-projects',
        component: PersonalProjectsComponent,
      },
      {
        path: 'certificates',
        component: CertificatesComponent,
      },
      {
        path: 'interests',
        component: InterestComponent,
      },
      {
        path: '**',
        redirectTo: 'personal-details',
      },
    ],
  },
  {
    path: 'templates',
    component: TemplatesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: 'templates',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
