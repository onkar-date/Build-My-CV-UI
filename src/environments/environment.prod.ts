import { DynamicEnvironment } from "./dynamic.environment";

export const environment: DynamicEnvironment = {
  production: true,
  baseUrl: 'https://build-my-cv-server.onrender.com',
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
  }
};
