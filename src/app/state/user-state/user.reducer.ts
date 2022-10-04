import { IProfile } from './../../shared/interface/profile.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  registerUser,
  registerUserSuccess,
  updatePersonalDetailsSuccess,
  updateContactDetailsSuccess,
  updateExperienceSuccess,
  addExperienceSuccess,
  deleteExperienceSuccess,
  addEducationSuccess,
  deleteEducationSuccess,
  updateEducationSuccess,
  addSkillSuccess,
  deleteSkillSuccess,
  updateSkillSuccess,
  addProjectSuccess,
  deleteProjectSuccess,
  updateProjectSuccess,
  updateCertificateSuccess,
  addCertificateSuccess,
  deleteCertificateSuccess,
  addInterestSuccess,
  deleteInterestSuccess,
  updateInterestSuccess,
} from './user.actions';
import { INITIAL_PROFILE_DATA } from 'src/app/shared/constants/profile.constants';
export interface UserState {
  userData: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    profileData: IProfile;
  };
  loggedIn: boolean;
}

const initialState: UserState = {
  userData: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    accessToken: '',
    refreshToken: '',
    profileData: getInitialProfileData(),
  },
  loggedIn: false,
};

export const userReducer = createReducer(
  initialState,

  on(loginUser, (state, { loginData }) => ({
    ...state,
  })),

  on(loginUserSuccess, (state, { userData }) => ({
    ...state,
    userData: userData,
    loggedIn: true,
  })),

  on(loginUserFailed, (state) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(logoutUser, (state) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(registerUser, (state, { userData }) => ({
    ...state,
    userData: initialState.userData,
    loggedIn: false,
  })),

  on(registerUserSuccess, (state, { userData }) => ({
    ...state,
    userData,
    loggedIn: true,
  })),

  on(updatePersonalDetailsSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateContactDetailsSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Experience
  on(addExperienceSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateExperienceSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteExperienceSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Education
  on(addEducationSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateEducationSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteEducationSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Skill
  on(addSkillSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateSkillSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteSkillSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Project
  on(addProjectSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateProjectSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteProjectSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Certificate
  on(addCertificateSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateCertificateSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteCertificateSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  // Interests
  on(addInterestSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(updateInterestSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  }),

  on(deleteInterestSuccess, (state, { profileData }) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        profileData,
      },
    };
  })
);

function getInitialProfileData(): IProfile {
  return JSON.parse(JSON.stringify(INITIAL_PROFILE_DATA));
}
