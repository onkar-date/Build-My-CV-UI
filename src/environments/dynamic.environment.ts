export interface DynamicEnvironment {
  production: boolean;
  baseUrl: string;
  apiUrls: {
    downloadResume: string;
    loginUser: string;
    registerUser: string;
    profile: string;
    savePersonalDetails: string;
    saveContactDetails: string;
    experience: string;
    education: string;
    skills: string;
    certificates: string;
    projects: string;
    interests: string;
  };
}
