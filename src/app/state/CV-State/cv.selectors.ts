import { CVState } from './cv.reducer';
import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';

export const selectCVState = (state: AppState) => state.cvState;

export const selectPersonalDetails = createSelector(
  selectCVState,
  (state: CVState) => state.personalDetails
)

export const selectSkills = createSelector(
  selectCVState,
  (state: CVState) => state.skills
)

export const selectExperiences = createSelector(
  selectCVState,
  (state: CVState) => state.experience
)

export const selectEducation = createSelector(
  selectCVState,
  (state: CVState) => state.education
)

export const selectProjects = createSelector(
  selectCVState,
  (state: CVState) => state.projects
)

export const selectCertificates = createSelector(
  selectCVState,
  (state: CVState) => state.certificates
)

export const selectTemplate = createSelector(
  selectCVState,
  (state: CVState) => state.template
)

export const selectInterests = createSelector(
  selectCVState,
  (state: CVState) => state.interest
)