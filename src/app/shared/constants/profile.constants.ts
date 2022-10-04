import { IProfile } from './../interface/profile.interface';
export const INITIAL_PROFILE_DATA: IProfile = {
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
  interests: [],
};
