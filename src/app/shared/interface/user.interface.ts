import { IProfile } from 'src/app/shared/interface/profile.interface';
export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileData: IProfile;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
