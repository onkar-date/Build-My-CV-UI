export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
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
