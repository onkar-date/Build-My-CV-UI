import { SECTIONS } from 'src/app/shared/constants/section.constants';
import { ISection } from './../../shared/interface/section.interface';
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
  editExperience,
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
  fillMockData,
  initiState,
  editSkill,
  editEducation,
  editProject,
  editCertificate,
  editInterest,
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
}

const initialState: CVState = (false && mockInitialState) || {
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
};

export const cvReducer = createReducer(
  initialState,

  on(initiState, (state, { cvState }) => ({
    ...state,
    ...cvState,
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

  on(editSkill, (state, { skill }) => ({
    ...state,
    skills: getUpdatedSkills(state.skills, skill),
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

  on(editExperience, (state, { experience }) => ({
    ...state,
    experience: getUpdatedExperienceList(state.experience, experience),
  })),

  on(removeExperience, (state, { experience }) => ({
    ...state,
    experience: state.experience.filter((_) => _ !== experience),
  })),

  on(addEducation, (state, { education }) => ({
    ...state,
    education: [...state.education, education],
  })),

  on(editEducation, (state, { education }) => ({
    ...state,
    education: getUpdatedEducationList(state.education, education),
  })),

  on(removeEducation, (state, { education }) => ({
    ...state,
    education: state.education.filter((_) => _ !== education),
  })),

  on(addProject, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
  })),

  on(editProject, (state, { project }) => ({
    ...state,
    projects: getUpdatedProjectList(state.projects, project),
  })),

  on(removeProject, (state, { project }) => ({
    ...state,
    projects: state.projects.filter((_) => _ !== project),
  })),

  on(addCertificate, (state, { certificate }) => ({
    ...state,
    certificates: [...state.certificates, certificate],
  })),

  on(editCertificate, (state, { certificate }) => ({
    ...state,
    certificates: getUpdatedCertificates(state.certificates, certificate),
  })),

  on(removeCertificate, (state, { certificate }) => ({
    ...state,
    certificates: state.certificates.filter((_) => _ !== certificate),
  })),

  on(addInterest, (state, { interest }) => ({
    ...state,
    interest: [...state.interest, interest],
  })),

  on(editInterest, (state, { updatedInterest, index }) => ({
    ...state,
    interest: getUpdatedInterests(state.interest, updatedInterest, index),
  })),

  on(removeInterest, (state, { interest }) => ({
    ...state,
    interest: state.interest.filter((_) => _ !== interest),
  })),

  on(finalizeTemplate, (state, { template }) => ({
    ...state,
    template,
  })),

  on(fillMockData, (state) => ({
    ...state,
    ...mockInitialState,
  }))
);

function getUpdatedExperienceList(
  experiences: IExperience[],
  updatedExperience: IExperience
): IExperience[] {
  return experiences.map((experience) => {
    if (experience.id === updatedExperience.id) {
      return updatedExperience;
    } else {
      return experience;
    }
  });
}

function getUpdatedSkills(skills: ISkill[], updatedSkill: ISkill): ISkill[] {
  return skills.map((skill) => {
    if (skill.id === updatedSkill.id) {
      return updatedSkill;
    } else {
      return skill;
    }
  });
}

function getUpdatedEducationList(
  educations: IEducation[],
  updatedEducation: IEducation
): IEducation[] {
  return educations.map((education) => {
    if (education.id === updatedEducation.id) {
      return updatedEducation;
    } else {
      return education;
    }
  });
}

function getUpdatedProjectList(
  projects: IProject[],
  updatedProject: IProject
): IProject[] {
  return projects.map((project) => {
    if (project.id === updatedProject.id) {
      return updatedProject;
    } else {
      return project;
    }
  });
}

function getUpdatedCertificates(
  certificates: ICertificate[],
  updatedCertificate: ICertificate
): ICertificate[] {
  return certificates.map((certificate) => {
    if (certificate.id === updatedCertificate.id) {
      return updatedCertificate;
    } else {
      return certificate;
    }
  });
}

function getUpdatedInterests(
  interests: string[],
  updatedInterest: string,
  index: number
): string[] {
  return interests.map((interest, idx) => {
    if (idx === index) {
      return updatedInterest;
    } else {
      return interest;
    }
  });
}
