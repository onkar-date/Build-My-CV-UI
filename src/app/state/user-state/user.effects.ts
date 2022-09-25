import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { LoginService } from './../../shared/services/login.service';
import {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} from './user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { ClientStoreService } from 'src/app/shared/services/client-store.service';
import { AppState } from '../app.state';
import { clearCVData } from '../CV-State/cv.actions';

@Injectable()
export class UserEffect {
  constructor(
    private action$: Actions,
    private loginService: LoginService,
    private toast: ToasterService,
    private router: Router,
    private clientStore: ClientStoreService,
    private store: Store<AppState>
  ) {}

  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        from(this.loginService.login(action.loginData)).pipe(
          map((userData) => {
            this.clientStore.setItem('user', userData);
            this.toast.success('Logged in Succesfully!');
            this.router.navigate(['templates']);
            return loginUserSuccess({ userData });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of(loginUserFailed());
          })
        )
      )
    )
  );

  logoutUser$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logoutUser),
        map(() => {
          this.clientStore.removeItem('cvState');
          this.clientStore.removeItem('user');
          this.store.dispatch(clearCVData());
          this.toast.success('Logged out Succesfully!!');
          this.router.navigate(['login']);
        })
      );
    },
    { dispatch: false }
  );

  registerUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        from(this.loginService.register(action.userData)).pipe(
          map((userData) => {
            this.clientStore.setItem('user', userData);
            this.toast.success('User registered succesfully!');
            this.router.navigate(['templates']);
            return registerUserSuccess({ userData });
          }),
          catchError((err) => {
            this.toast.error(err.error?.message || 'Something went wrong');
            return of(registerUserFailed());
          })
        )
      )
    )
  );
}
