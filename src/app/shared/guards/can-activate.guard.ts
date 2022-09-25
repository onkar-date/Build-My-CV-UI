import { ClientStoreService } from 'src/app/shared/services/client-store.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interface/user.interface';
import { loginUserSuccess } from 'src/app/state/user-state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private clientStore: ClientStoreService
  ) {}
  async canActivate(): Promise<boolean> {
    const userData = await this.clientStore.getItem('user');
    if (userData) {
      this.store.dispatch(loginUserSuccess({ userData }));
      return true;
    } else {
      return false;
    }
  }
}
