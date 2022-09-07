import { ITemplate } from './../../shared/interface/template.interface';
import { IProject } from './../../shared/interface/project.interface';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { IExperience } from './../../shared/interface/experience.interface';
import { ISkill } from './../../shared/interface/skills.interface';
import { IPersonalDetails } from '../../shared/interface/personalDetails.interface';
import { createAction, props } from '@ngrx/store';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';

export const savePersonalDetails = createAction(
  '[Personsl Details] Save Personal Details',
  props<{ personalDetails: IPersonalDetails }>()
);

export const addSkill = createAction(
  '[Skills] Add Skill',
  props<{ skill: ISkill }>()
);

export const removeSkill = createAction(
  '[Skills] Remove Skill',
  props<{ name: string }>()
);

export const saveSkillsDetails = createAction(
  '[Skills] Save Skills Details',
  props<{ skills: ISkill[] }>()
);

export const addExperience = createAction(
  '[Experience] Add Experience',
  props<{ experience: IExperience }>()
);

export const removeExperience = createAction(
  '[Experience] Remove Experience',
  props<{ experience: IExperience }>()
)

export const addEducation = createAction(
  '[Education] Add Education',
  props<{ education: IEducation }>()
)

export const removeEducation = createAction(
  '[Education] Remove Education',
  props<{ education: IEducation }>()
)

export const addProject = createAction(
  '[Project] Add Project',
  props<{ project: IProject }>()
)

export const removeProject = createAction(
  '[Project] Remove Project',
  props<{ project: IProject }>()
)

export const addCertificate = createAction(
  '[Certificate] Add Certificate',
  props<{ certificate: ICertificate }>()
)

export const removeCertificate = createAction(
  '[Certificate] Remove Certificate',
  props<{ certificate: ICertificate }>()
)

export const finalizeTemplate = createAction(
  '[Templates] Select Template',
  props<{ template: ITemplate }>()
)