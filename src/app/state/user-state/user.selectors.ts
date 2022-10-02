import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectCVState = (state: AppState) => state.userState;

export const selectUserData = createSelector(
  selectCVState,
  (state: UserState) => state.userData
);

export const selectUserLoggedIn = createSelector(
  selectCVState,
  (state: UserState) => state.loggedIn
);

export const selectUserProfileData = createSelector(
  selectCVState,
  (state: UserState) => state.userData.profileData
);