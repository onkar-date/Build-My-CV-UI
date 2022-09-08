import { IProject } from './../../shared/interface/project.interface';
import { AddProjectModalComponent } from './../../library/shared-components/add-project-modal/add-project-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { AppState } from 'src/app/state/app.state';
import { addProject, removeEducation, removeProject } from 'src/app/state/CV-State/cv.actions';
import { selectProjects } from 'src/app/state/CV-State/cv.selectors';

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.scss'],
})
export class PersonalProjectsComponent implements OnInit {
  projects$ = this.store.select(selectProjects);
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    this.router.navigate(['../certificates'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../education'], {
      relativeTo: this.activatedRoute,
    });
  }

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }
}
