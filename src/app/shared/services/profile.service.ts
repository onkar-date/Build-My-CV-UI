import { API_METHOD } from './../constants/api';
import { environment } from 'src/environments/environment';
import { IProfile } from './../interface/profile.interface';
import { WrapperService } from './wrapper.service';
import { Injectable } from '@angular/core';
import UrlHelper from '../helpers/url.helper';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: WrapperService) { }

  async updateProfileData(userId: string, profileData: IProfile): Promise<IProfile> {
    const url = UrlHelper.createUrl([environment.apiUrls.profile]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, profileData);
  }
}
