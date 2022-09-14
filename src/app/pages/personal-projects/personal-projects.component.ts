import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { IProject } from './../../shared/interface/project.interface';
import { AddProjectModalComponent } from './../../library/shared-components/add-project-modal/add-project-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addProject, removeProject } from 'src/app/state/CV-State/cv.actions';
import { selectProjects } from 'src/app/state/CV-State/cv.selectors';
import { Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.scss'],
})
export class PersonalProjectsComponent implements OnInit {
  projects$ = this.store.select(selectProjects);
  sections: ISection[] = SECTIONS;
  destroy$ = new Subject();
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addProject() {
    const modal = this.modalService.open(AddProjectModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modal.result.then((project: IProject) => {
      if (project) {
        this.store.dispatch(addProject({ project }));
      }
    });
  }

  deleteProject(project: IProject) {
    this.store.dispatch(removeProject({ project }));
  }

  goToNextSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.nextSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  goToPreviousSection(): void {
    const currentSection = this.sections.find((section) => {
      return section.routerLink === this.router.url.split('/').pop();
    });
    if (currentSection) {
      this.router.navigate([`../${currentSection.previousSection}`], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }
}
