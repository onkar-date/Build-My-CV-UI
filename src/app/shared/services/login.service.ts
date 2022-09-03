import { WrapperService } from './wrapper.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_URL, API_METHOD } from '../constants/api';
import UrlHelper from '../helpers/url.helper';

interface IRegisterData {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

interface ILoginData {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private wrapperService: WrapperService) {}

  async login(loginData: ILoginData) {
    const loginUrl = UrlHelper.createUrl([environment.baseUrl, API_URL.login]);
    return this.wrapperService.Api(API_METHOD.POST, loginUrl, null, loginData);
  }

  async register(registerData: IRegisterData) {
    const registerUrl = UrlHelper.createUrl([environment.baseUrl, API_URL.register]);
    return this.wrapperService.Api(API_METHOD.POST, registerUrl, null, registerData);
  }
}
