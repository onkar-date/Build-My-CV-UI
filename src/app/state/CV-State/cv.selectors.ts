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
