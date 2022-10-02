import { IProfile } from './../../shared/interface/profile.interface';
import { createReducer, on } from '@ngrx/store';
import {
  updateUserProfile,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserSuccess,
  updateUserProfileSuccess,
} from './user.actions';
import { INITIAL_PROFILE_DATA } from 'src/app/shared/constants/profile.constants';
export interface UserState {
  userData: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    profileData: IProfile;
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
    profileData: getInitialProfileData(),
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
  })),

  on(updateUserProfile, (state) => ({
    ...state,
    profileData: getInitialProfileData(),
  })),

  on(updateUserProfileSuccess, (state, { updatedProfileData }) => ({
    ...state,
    profileData: updatedProfileData,
  }))
);

function getInitialProfileData(): IProfile {
  return JSON.parse(JSON.stringify(INITIAL_PROFILE_DATA));
}
