import { CertificatesComponent } from './pages/certificates/certificates.component';
import { PersonalProjectsComponent } from './pages/personal-projects/personal-projects.component';
import { EducationComponent } from './pages/education/education.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'personal-details',
        component: PersonalDetailsComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'experience',
        component: ExperienceComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'personal-projects',
        component: PersonalProjectsComponent
      },
      {
        path: 'certificates',
        component: CertificatesComponent
      },
      {
        path: '**',
        redirectTo: 'personal-details'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
