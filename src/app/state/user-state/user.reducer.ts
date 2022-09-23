import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserSuccess,
} from './user.actions';
export interface UserState {
  userData: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
  };
  loggedIn: boolean;
}

const initialState: UserState = {
  userData: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    accessToken: '',
    refreshToken: '',
  },
  loggedIn: false,
};

export const userReducer = createReducer(
  initialState,

  on(loginUser, (state, { loginData }) => ({
    ...state,
  })),

  on(loginUserSuccess, (state, { userData }) => ({
    ...state,
    userData: userData,
    loggedIn: true,
  })),

  on(loginUserFailed, (state) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(logoutUser, (state) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(registerUser, (state, { userData }) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(registerUserSuccess, (state, { userData }) => ({
    ...state,
    userData,
    loggedIn: true,
  }))
);
