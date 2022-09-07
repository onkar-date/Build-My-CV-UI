import { removeExperience } from './../../state/CV-State/cv.actions';
import { selectExperiences } from './../../state/CV-State/cv.selectors';
import { AppState } from './../../state/app.state';
import { Store } from '@ngrx/store';
import { IExperience } from './../../shared/interface/experience.interface';
import { AddExperienceModalComponent } from './../../library/shared-components/add-experience-modal/add-experience-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addExperience } from 'src/app/state/CV-State/cv.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences$ = this.store.select(selectExperiences);
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addExperience() {
    const modal = this.modalService.open(AddExperienceModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modal.result.then((experience: IExperience) => {
      if (experience) {
        this.store.dispatch(addExperience({ experience }));
      }
    });
  }

  deleteExperience(experience: IExperience) {
    this.store.dispatch(removeExperience({ experience }));
  }

  goToNextSection(): void {
    this.router.navigate(['../education'], {
      relativeTo: this.activatedRoute,
    });
  }

  goToPreviousSection(): void {
    this.router.navigate(['../skills'], {
      relativeTo: this.activatedRoute,
    });
  }
}
