import { ConfirmationPromptComponent } from './library/shared-components/confirmation-prompt/confirmation-prompt.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CVState } from './state/CV-State/cv.reducer';
import { ClientStoreService } from './shared/services/client-store.service';
import { selectCVState } from './state/CV-State/cv.selectors';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { initiState } from './state/CV-State/cv.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  stateData!: CVState;
  appLoaded = false;
  title = 'Build My CV';
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private clientStore: ClientStoreService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.router.navigate(['templates']);
    this.clientStore.getItem('cvState').then(async (stateData: CVState) => {
      if (stateData) {
        if (await this.confirmUnsavedChanges()) {
          this.store.dispatch(initiState({ cvState: stateData }));
          this.router.navigate(['home/personal-details']);
        }
      }
      this.appLoaded = true;
    });
    this.store.select(selectCVState).subscribe((cvState) => {
      this.clientStore.setItem('cvState', cvState);
    });
  }

  async confirmUnsavedChanges(): Promise<boolean> {
    const modalRef = this.modal.open(ConfirmationPromptComponent, {
      keyboard: false,
      backdrop: 'static'
    });
    modalRef.componentInstance.title = 'Continue Editing ?';
    modalRef.componentInstance.bodyMessage = 'Do you want to continue where you left ?';
    return await modalRef.result;
    
  }
}
