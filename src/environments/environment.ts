import { DynamicEnvironment } from './dynamic.environment';

export const environment: DynamicEnvironment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  apiUrls: {
    downloadResume: 'pdf',
    loginUser: 'user/login',
    registerUser: 'user/register',
    profile: 'profile',
    savePersonalDetails: 'profile/personal-details',
    saveContactDetails: 'profile/contact-details',
    experience: 'profile/experience',
    education: 'profile/education',
    skills: 'profile/skills',
    certificates: 'profile/certificates',
    projects: 'profile/projects',
    interests: 'profile/interests'
  },
};
