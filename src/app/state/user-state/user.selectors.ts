import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const userState = (state: AppState) => state.userState;

export const selectUserData = createSelector(
  userState,
  (state: UserState) => state.userData
);

export const selectUserLoggedIn = createSelector(
  userState,
  (state: UserState) => state.loggedIn
);

export const selectUserProfileData = createSelector(
  userState,
  (state: UserState) => state.userData.profileData
);

export const selectUserProfileExperience = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.experience
);

export const selectUserProfileSkills = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.skills
);

export const selectUserProfileEducation = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.education
);

export const selectUserProfileProjects = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.projects
);

export const selectUserProfileCertificates = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.certificates
);

export const selectUserProfileInterests = createSelector(
  userState,
  (state: UserState) => state.userData.profileData.interests
);