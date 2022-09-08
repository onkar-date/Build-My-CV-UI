import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from './../library/shared-components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PersonalProjectsComponent } from './personal-projects/personal-projects.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { SummaryComponent } from './summary/summary.component';
import { TemplatesComponent } from './templates/templates.component';
import { T102Component } from './t102/t102.component';
import { T101Component } from './t101/t101.component';
import { T103Component } from './t103/t103.component';
import { T104Component } from './t104/t104.component';
import { InterestComponent } from './interest/interest.component';
import { T105Component } from './t105/t105.component';
@NgModule({
  declarations: [
    HomeComponent,
    PersonalDetailsComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    PersonalProjectsComponent,
    CertificatesComponent,
    SummaryComponent,
    TemplatesComponent,
    T102Component,
    T101Component,
    T103Component,
    T104Component,
    InterestComponent,
    T105Component,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class PagesModule {}
