import {
  selectUserData,
  selectUserProfileProjects,
} from './../../state/user-state/user.selectors';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/shared/interface/user.interface';
import { AppState } from 'src/app/state/app.state';
import { AddProjectModalComponent } from 'src/app/library/shared-components/add-project-modal/add-project-modal.component';
import { ConfirmationPromptComponent } from 'src/app/library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { IProject } from 'src/app/shared/interface/project.interface';
import { addProject, updateProject, deleteProject } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss'],
})
export class ProfileProjectsComponent implements OnInit {
  userData!: IUser;
  projects$ = this.store.select(selectUserProfileProjects);
  constructor(private store: Store<AppState>, private modalService: NgbModal) {
    this.store.select(selectUserData).subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {}

  addEditProject(project: IProject | null, event: Event, edit: boolean): void {
    event.stopPropagation();
    const modal = this.modalService.open(AddProjectModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    if (edit) {
      modal.componentInstance.project = project;
    }
    modal.result.then((projectData: IProject) => {
      if (projectData) {
        if (edit) {
          this.store.dispatch(
            updateProject({
              userId: this.getUserId(),
              project: projectData,
            })
          );
        } else {
          this.store.dispatch(
            addProject({ userId: this.getUserId(), project: projectData })
          );
        }
      }
    });
  }

  async deleteProject(project: IProject, event: Event): Promise<void> {
    event.stopPropagation();
    const modalRef = this.modalService.open(ConfirmationPromptComponent, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.title = 'Delete Project ?';
    modalRef.componentInstance.bodyMessage =
      'Are you sure want to delete Project ?';
    const shouldDelete = await modalRef.result;
    if (shouldDelete) {
      this.store.dispatch(
        deleteProject({ userId: this.getUserId(), projectId: project.id })
      );
    }
  }

  openProject(project: IProject): void {
    window.open(project.link, '_blank');
  }

  getUserId(): string {
    return this.userData.userId;
  }
}
