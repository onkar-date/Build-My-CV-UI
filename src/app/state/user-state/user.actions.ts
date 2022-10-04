import { IExperience } from './../../shared/interface/experience.interface';
import { IContactDetails } from './../../shared/interface/contactDetails.interface';
import { IProfile } from './../../shared/interface/profile.interface';
import { IRegisterUser, IUser } from './../../shared/interface/user.interface';
import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/shared/interface/user.interface';
import { IPersonalDetails } from 'src/app/shared/interface/personalDetails.interface';
import { IEducation } from 'src/app/shared/interface/education.interface';
import { ISkill } from 'src/app/shared/interface/skills.interface';
import { IProject } from 'src/app/shared/interface/project.interface';
import { ICertificate } from 'src/app/shared/interface/certificate.interface';
import { Interest } from 'src/app/shared/interface/interest.interface';

export const loginUser = createAction(
  '[Login] Login User',
  props<{ loginData: ILoginData }>()
);

export const loginUserSuccess = createAction(
  '[Login] Login User Success',
  props<{ userData: IUser }>()
);

export const loginUserFailed = createAction('[Login] Login User Failed');

export const logoutUser = createAction('[Logout] Logout User');

export const registerUser = createAction(
  '[Register] Register User',
  props<{ userData: IRegisterUser }>()
);

export const registerUserSuccess = createAction(
  '[Register] Register User Success',
  props<{ userData: IUser }>()
);

export const registerUserFailed = createAction(
  '[Register] Register User Failed'
);

export const updatePersonalDetails = createAction(
  '[Profile] Update Personal Details',
  props<{ userId: string, personalDetails: IPersonalDetails }>()
);

export const updatePersonalDetailsSuccess = createAction(
  '[Profile] Update Personal Details Success',
  props<{ profileData: IProfile }>()
);

export const updateContactDetails = createAction(
  '[Profile] Update Contact Details',
  props<{ userId: string, contactDetails: IContactDetails }>()
);

export const updateContactDetailsSuccess = createAction(
  '[Profile] Update Contact Details Success',
  props<{ profileData: IProfile }>()
);


// Experience
export const addExperience = createAction(
  '[Profile] Add Experience',
  props<{ userId: string, experience: IExperience }>()
);

export const addExperienceSuccess = createAction(
  '[Profile] Add Experience Success',
  props<{ profileData: IProfile }>()
);

export const updateExperience = createAction(
  '[Profile] Update Experience',
  props<{ userId: string, experience: IExperience }>()
);

export const updateExperienceSuccess = createAction(
  '[Profile] Update Experience Success',
  props<{ profileData: IProfile }>()
);

export const deleteExperience = createAction(
  '[Profile] Delete Experience',
  props<{ userId: string, expId: string }>()
);

export const deleteExperienceSuccess = createAction(
  '[Profile] Delete Experience Success',
  props<{ profileData: IProfile }>()
);

// Education
export const addEducation = createAction(
  '[Profile] Add Education',
  props<{ userId: string, education: IEducation }>()
);

export const addEducationSuccess = createAction(
  '[Profile] Add Education Success',
  props<{ profileData: IProfile }>()
);

export const updateEducation = createAction(
  '[Profile] Update Education',
  props<{ userId: string, education: IEducation }>()
);

export const updateEducationSuccess = createAction(
  '[Profile] Update Education Success',
  props<{ profileData: IProfile }>()
);

export const deleteEducation = createAction(
  '[Profile] Delete Education',
  props<{ userId: string, educationId: string }>()
);

export const deleteEducationSuccess = createAction(
  '[Profile] Delete Education Success',
  props<{ profileData: IProfile }>()
);

// Skills
export const addSkill = createAction(
  '[Profile] Add Skill',
  props<{ userId: string, skill: ISkill }>()
);

export const addSkillSuccess = createAction(
  '[Profile] Add Skill Success',
  props<{ profileData: IProfile }>()
);

export const updateSkill = createAction(
  '[Profile] Update Skill',
  props<{ userId: string, skill: ISkill }>()
);

export const updateSkillSuccess = createAction(
  '[Profile] Update Skill Success',
  props<{ profileData: IProfile }>()
);

export const deleteSkill = createAction(
  '[Profile] Delete Skill',
  props<{ userId: string, skillId: string }>()
);

export const deleteSkillSuccess = createAction(
  '[Profile] Delete Skill Success',
  props<{ profileData: IProfile }>()
);

// Projects
export const addProject = createAction(
  '[Profile] Add Project',
  props<{ userId: string, project: IProject }>()
);

export const addProjectSuccess = createAction(
  '[Profile] Add Project Success',
  props<{ profileData: IProfile }>()
);

export const updateProject = createAction(
  '[Profile] Update Project',
  props<{ userId: string, project: IProject }>()
);

export const updateProjectSuccess = createAction(
  '[Profile] Update Project Success',
  props<{ profileData: IProfile }>()
);

export const deleteProject = createAction(
  '[Profile] Delete Project',
  props<{ userId: string, projectId: string }>()
);

export const deleteProjectSuccess = createAction(
  '[Profile] Delete Project Success',
  props<{ profileData: IProfile }>()
);

// Certificate
export const addCertificate = createAction(
  '[Profile] Add Certificate',
  props<{ userId: string, certificate: ICertificate }>()
);

export const addCertificateSuccess = createAction(
  '[Profile] Add Certificate Success',
  props<{ profileData: IProfile }>()
);

export const updateCertificate = createAction(
  '[Profile] Update Certificate',
  props<{ userId: string, certificate: ICertificate }>()
);

export const updateCertificateSuccess = createAction(
  '[Profile] Update Certificate Success',
  props<{ profileData: IProfile }>()
);

export const deleteCertificate = createAction(
  '[Profile] Delete Certificate',
  props<{ userId: string, certificateId: string }>()
);

export const deleteCertificateSuccess = createAction(
  '[Profile] Delete Certificate Success',
  props<{ profileData: IProfile }>()
);

// Interests
export const addInterest = createAction(
  '[Profile] Add Interest',
  props<{ userId: string, interest: Interest }>()
);

export const addInterestSuccess = createAction(
  '[Profile] Add Interest Success',
  props<{ profileData: IProfile }>()
);

export const updateInterest = createAction(
  '[Profile] Update Interest',
  props<{ userId: string, interest: Interest }>()
);

export const updateInterestSuccess = createAction(
  '[Profile] Update Interest Success',
  props<{ profileData: IProfile }>()
);

export const deleteInterest = createAction(
  '[Profile] Delete interest',
  props<{ userId: string, interestId: string }>()
);

export const deleteInterestSuccess = createAction(
  '[Profile] Delete interest Success',
  props<{ profileData: IProfile }>()
);