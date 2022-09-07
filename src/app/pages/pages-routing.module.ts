import { Template1Component } from './template1/template1.component';
import { TemplatesComponent } from './templates/templates.component';
import { SummaryComponent } from './summary/summary.component';
import { AuthGuard } from './../shared/guards/auth.guard';
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
        path: 'templates',
        component: TemplatesComponent,
      },
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: '**',
        redirectTo: 'personal-details',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
