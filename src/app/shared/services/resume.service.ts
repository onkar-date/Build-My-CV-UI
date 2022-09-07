import { environment } from 'src/environments/environment';
import { API_METHOD } from './../constants/api';
import { CVState } from './../../state/CV-State/cv.reducer';
import { ITemplate } from './../interface/template.interface';
import { WrapperService } from './wrapper.service';
import { Injectable } from '@angular/core';
import UrlHelper from '../helpers/url.helper';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private apiService: WrapperService) { }

  async downloadResume(template: ITemplate, cvData: CVState): Promise<any> {
    const reqBody = {
      templateId: template.id,
      ...cvData
    };
    const apiUrl = UrlHelper.createUrl([environment.baseUrl, environment.apiUrls.downloadResume]);
    return await this.apiService.Api(API_METHOD.POST, apiUrl, null, reqBody, 'blob');
  }
}
