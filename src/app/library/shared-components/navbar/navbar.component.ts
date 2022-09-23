import { ConfirmationPromptComponent } from './../confirmation-prompt/confirmation-prompt.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  selectUserData,
  selectUserLoggedIn,
} from './../../../state/user-state/user.selectors';
import { SECTIONS } from './../../../shared/constants/section.constants';
import { AppState } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logoutUser } from 'src/app/state/user-state/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  username: string | undefined;
  userData$ = this.store.select(selectUserData);
  userLoggedIn$ = this.store.select(selectUserLoggedIn);
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  showTemplates(): void {
    this.router.navigate(['./templates']);
  }

  goToSummary(): void {
    this.router.navigate(['./summary']);
  }

  toggleMenu(): void {}

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    const modalRef = this.modal.open(ConfirmationPromptComponent, {
      size: 'md',
      keyboard: false,
      backdrop: 'static',
    });
    modalRef.componentInstance.title = 'Logout';
    modalRef.componentInstance.bodyMessage = 'Are you sure want to logout ?';
    modalRef.result.then(logout => {
      if (logout) {
        this.store.dispatch(logoutUser());
      }
    })
  }
}
