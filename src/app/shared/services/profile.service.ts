import { IExperience } from './../interface/experience.interface';
import { IContactDetails } from './../interface/contactDetails.interface';
import { IPersonalDetails } from './../interface/personalDetails.interface';
import { API_METHOD } from './../constants/api';
import { environment } from 'src/environments/environment';
import { IProfile } from './../interface/profile.interface';
import { WrapperService } from './wrapper.service';
import { Injectable } from '@angular/core';
import UrlHelper from '../helpers/url.helper';
import { HttpParams } from '@angular/common/http';
import { IEducation } from '../interface/education.interface';
import { ISkill } from '../interface/skills.interface';
import { IProject } from '../interface/project.interface';
import { ICertificate } from '../interface/certificate.interface';
import { Interest } from '../interface/interest.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: WrapperService) {}

  async savePersonalDetails(
    userId: string,
    personalDetails: IPersonalDetails
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.savePersonalDetails,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(
      API_METHOD.PUT,
      url,
      params,
      personalDetails
    );
  }

  async saveContactDetails(
    userId: string,
    contactDetails: IContactDetails
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.saveContactDetails,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(
      API_METHOD.PUT,
      url,
      params,
      contactDetails
    );
  }

  // Experience
  async addExperience(
    userId: string,
    experience: IExperience
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.experience,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, experience);
  }

  async updateExperience(
    userId: string,
    experience: IExperience
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.experience,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, experience);
  }

  async deleteExperience(
    userId: string,
    experienceId: string
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.experience,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('expId', experienceId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }

  // Education
  async addEducation(userId: string, education: IEducation): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.education,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, education);
  }

  async updateEducation(
    userId: string,
    education: IEducation
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.education,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, education);
  }

  async deleteEducation(
    userId: string,
    educationId: string
  ): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.education,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('educationId', educationId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }

  // Skill
  async addSkill(userId: string, skill: ISkill): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.skills,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, skill);
  }

  async updateSkill(userId: string, skill: ISkill): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.skills,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, skill);
  }

  async deleteSkill(userId: string, skillId: string): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.skills,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('skillId', skillId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }

  // Project
  async addProject(userId: string, project: IProject): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.projects,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, project);
  }

  async updateProject(userId: string, project: IProject): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.projects,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, project);
  }

  async deleteProject(userId: string, projectId: string): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.projects,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('projectId', projectId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }

  // Certificate
  async addCertificate(userId: string, certificate: ICertificate): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.certificates,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, certificate);
  }

  async updateCertificate(userId: string, certificate: ICertificate): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.certificates,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, certificate);
  }

  async deleteCertificate(userId: string, certificateId: string): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.certificates,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('certificateId', certificateId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }

  // Interests
  async addInterest(userId: string, interest: Interest): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.interests,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.POST, url, params, interest);
  }

  async updateInterest(userId: string, interest: Interest): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.interests,
    ]);
    const params = new HttpParams().set('userId', userId);
    return await this.apiService.Api(API_METHOD.PUT, url, params, interest);
  }

  async deleteInterest(userId: string, interestId: string): Promise<IProfile> {
    const url = UrlHelper.createUrl([
      environment.baseUrl,
      environment.apiUrls.interests,
    ]);
    const params = new HttpParams()
      .set('userId', userId)
      .set('interestId', interestId);
    return await this.apiService.Api(API_METHOD.DELETE, url, params);
  }
}
