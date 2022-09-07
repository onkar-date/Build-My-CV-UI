import {
  mockInitialState,
} from './../../shared/stub/mockData';
import { ITemplate } from './../../shared/interface/template.interface';
import { IProject } from './../../shared/interface/project.interface';
import { IExperience } from './../../shared/interface/experience.interface';
import { ISkill } from './../../shared/interface/skills.interface';
import { IPersonalDetails } from './../../shared/interface/personalDetails.interface';
import {
  savePersonalDetails,
  saveSkillsDetails,
  addSkill,
  removeSkill,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  addProject,
  removeProject,
  addCertificate,
  removeCertificate,
  finalizeTemplate,
} from './cv.actions';
import { createReducer, on } from '@ngrx/store';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';
export interface CVState {
  personalDetails: IPersonalDetails;
  contactDetails: {
    mobile: string;
    email: string;
    linkedIn: string;
    address: string;
  };
  skills: ISkill[];
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  certificates: ICertificate[];
  interest: string[];
  template: ITemplate;
}

const initialState: CVState = mockInitialState || {
  personalDetails: {
    firstName: '',
    lastName: '',
    areaOfExpertise: '',
    aboutMe: '',
  },
  contactDetails: {
    mobile: '',
    email: '',
    linkedIn: '',
    address: '',
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  interest: [],
  template: {
    name: '',
    id: '',
  },
};

export const cvReducer = createReducer(
  initialState,

  on(savePersonalDetails, (state, { personalDetails }) => ({
    ...state,
    personalDetails,
  })),

  on(addSkill, (state, { skill }) => ({
    ...state,
    skills: [...state.skills, skill],
  })),

  on(removeSkill, (state, { name }) => ({
    ...state,
    skills: state.skills.filter((skill) => skill.name !== name),
  })),

  on(saveSkillsDetails, (state, { skills }) => ({
    ...state,
    skills,
  })),

  on(addExperience, (state, { experience }) => ({
    ...state,
    experience: [...state.experience, experience],
  })),

  on(removeExperience, (state, { experience }) => ({
    ...state,
    experience: state.experience.filter((_) => _ !== experience),
  })),

  on(addEducation, (state, { education }) => ({
    ...state,
    education: [...state.education, education],
  })),

  on(removeEducation, (state, { education }) => ({
    ...state,
    education: state.education.filter((_) => _ !== education),
  })),

  on(addProject, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
  })),

  on(removeProject, (state, { project }) => ({
    ...state,
    projects: state.projects.filter((_) => _ !== project),
  })),

  on(addCertificate, (state, { certificate }) => ({
    ...state,
    certificates: [...state.certificates, certificate],
  })),

  on(removeCertificate, (state, { certificate }) => ({
    ...state,
    certificates: state.certificates.filter((_) => _ !== certificate),
  })),

  on(finalizeTemplate, (state, { template }) => ({
    ...state,
    template,
  }))
);
