import { IRegisterUser, IUser } from './../../shared/interface/user.interface';
import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/shared/interface/user.interface';

export const loginUser = createAction(
  '[Login] Login User',
  props<{ loginData: ILoginData }>()
);

export const loginUserSuccess = createAction(
  '[Login] Login User Success',
  props<{ userData: IUser }>()
);

export const loginUserFailed = createAction(
  '[Login] Login User Failed'
);

export const logoutUser = createAction('[Logout] Logout User');

export const registerUser = createAction(
  '[Register] Register User',
  props<{ userData: IRegisterUser }>()
);

export const registerUserSuccess = createAction(
  '[Register] Register User Success',
  props<{ userData: IUser }>()
);

export const registerUserFailed = createAction(
  '[Register] Register User Failed'
);
