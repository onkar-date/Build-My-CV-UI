import { ISkill } from './../../shared/interface/skills.interface';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import { savePersonalDetails, saveSkillsDetails } from './cv.actions';
import { createReducer, on } from '@ngrx/store';
export interface CVState {
  personalDetails: IPersonalDetails;
  skills: ISkill[];
}

const initialState: CVState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    address: '',
    areaOfExpertise: '',
  },
  skills: [
    {
      name: 'Angular',
      rating: 5
    }
  ],
};

export const cvReducer = createReducer(
  initialState,

  on(savePersonalDetails, (state, { personalDetails }) => ({
    ...state,
    personalDetails,
  })),

  on(saveSkillsDetails, (state, { skills }) => ({
    ...state,
    skills,
  }))
);
