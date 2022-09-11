import { SECTIONS } from 'src/app/shared/constants/section.constants';
import {
  ISection,
  ISectionValidity,
} from './../../shared/interface/section.interface';
import { mockInitialState } from './../../shared/stub/mockData';
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
  addInterest,
  removeInterest,
  saveContactDetails,
  selectSection,
  upadateSectionValidity,
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
  sections: ISection[];
  sectionValidity: ISectionValidity;
}

const initialState: CVState = {
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
  sections: SECTIONS,
  sectionValidity: {
    personalDetails: false,
    contactDetails: false,
    skills: false,
    experience: false,
    education: false,
    template: false,
  },
};

export const cvReducer = createReducer(
  initialState,

  on(selectSection, (state, { section }) => ({
    ...state,
    sections: getUpdatedSections(state.sections, section),
  })),

  on(upadateSectionValidity, (state, { sectionKey, validity }) => ({
    ...state,
    sectionValidity: {
      ...state.sectionValidity,
      [sectionKey]: validity,
    },
  })),

  on(savePersonalDetails, (state, { personalDetails }) => ({
    ...state,
    personalDetails,
  })),

  on(saveContactDetails, (state, { contactDetails }) => ({
    ...state,
    contactDetails,
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
  })),

  on(addInterest, (state, { interest }) => ({
    ...state,
    interest: [...state.interest, interest],
  })),

  on(removeInterest, (state, { interest }) => ({
    ...state,
    interest: state.interest.filter((_) => _ !== interest),
  }))
);

function getUpdatedSections(
  currentSections: ISection[],
  selectedSection: ISection
): ISection[] {
  return currentSections.map((section) => {
    return {
      ...section,
      active: section.title === selectedSection.title,
    };
  });
}
