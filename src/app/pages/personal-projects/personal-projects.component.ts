import { IProject } from './../../shared/interface/project.interface';
import { AddProjectModalComponent } from './../../library/shared-components/add-project-modal/add-project-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { AppState } from 'src/app/state/app.state';
import {
  addProject,
  removeEducation,
  removeProject,
  selectSection,
} from 'src/app/state/CV-State/cv.actions';
import {
  selectProjects,
  selectSections,
} from 'src/app/state/CV-State/cv.selectors';
import { takeUntil, Subject } from 'rxjs';
import { ISection } from 'src/app/shared/interface/section.interface';

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.scss'],
})
export class PersonalProjectsComponent implements OnInit {
  projects$ = this.store.select(selectProjects);
  sections: ISection[] = [];
  destroy$ = new Subject();
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    store
      .select(selectSections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sections: ISection[]) => {
        this.sections = sections;
      });
  }

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
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].active) {
        this.store.dispatch(selectSection({ section: this.sections[i + 1] }));
        this.router.navigate([`../${this.sections[i + 1].routerLink}`], {
          relativeTo: this.activatedRoute,
        });
        break;
      }
    }
  }

  goToPreviousSection(): void {
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].active) {
        this.store.dispatch(selectSection({ section: this.sections[i - 1] }));
        this.router.navigate([`../${this.sections[i - 1].routerLink}`], {
          relativeTo: this.activatedRoute,
        });
        break;
      }
    }
  }

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }
}
