import { loginUserSuccess } from './state/user-state/user.actions';
import { IUser } from './shared/interface/user.interface';
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
  userDataLoaded = false;
  title = 'Build My CV';
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private clientStore: ClientStoreService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.checkCachedCVData();
    this.checkCachedUserData();
    this.store.select(selectCVState).subscribe((cvState) => {
      this.clientStore.setItem('cvState', cvState);
    });
  }

  checkCachedCVData(): void {
    this.clientStore.getItem('cvState').then(async (stateData: CVState) => {
      if (stateData) {
        if (await this.confirmUnsavedChanges()) {
          this.store.dispatch(initiState({ cvState: stateData }));
        } else {
          this.clientStore.removeItem('cvState');
          this.router.navigate(['templates']);
        }
      } else {
        this.router.navigate(['templates']);
      }
      this.appLoaded = true;
    });
  }

  checkCachedUserData(): void {
    this.clientStore.getItem('user').then((user: IUser) => {
      if (user) {
        this.store.dispatch(loginUserSuccess({ userData: user }));
      } 
      this.userDataLoaded = true;
    });
  }

  async confirmUnsavedChanges(): Promise<boolean> {
    const modalRef = this.modal.open(ConfirmationPromptComponent, {
      keyboard: false,
      backdrop: 'static',
    });
    modalRef.componentInstance.title = 'Continue Editing ?';
    modalRef.componentInstance.bodyMessage =
      'Do you want to continue where you left ?';
    return await modalRef.result;
  }
}
