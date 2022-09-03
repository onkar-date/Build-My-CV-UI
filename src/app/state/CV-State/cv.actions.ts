import { ISkill } from './../../shared/interface/skills.interface';
import { IPersonalDetails } from '../../shared/interface/personalDetails.interface';
import { createAction, props } from '@ngrx/store';

export const savePersonalDetails = createAction(
  '[Personsl Details] Save Personal Details',
  props<{ personalDetails: IPersonalDetails }>()
);

export const saveSkillsDetails = createAction(
  '[Skills] Save Skills Details',
  props<{ skills: ISkill[] }>()
);
