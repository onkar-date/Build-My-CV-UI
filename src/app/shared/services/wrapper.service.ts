import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WrapperService {
  constructor(private httpClient: HttpClient) {}

  public async Api(
    method: string,
    url: string,
    params?: any,
    data?: any,
    responseType?: any,
  ): Promise<any> {
    if (params) {
      return await this.httpClient
        .request(method, url, { body: data, responseType, params })
        .toPromise();
    } else {
      return await this.httpClient
        .request(method, url, { body: data, responseType })
        .toPromise();
    }
  }
}
