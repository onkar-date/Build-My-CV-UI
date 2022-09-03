import { ClientStoreService } from './client-store.service';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private clientStore: ClientStoreService
  ) { }

  async getUserData(): Promise<IUser> {
    const userData = await this.clientStore.getItem('userData');
    return userData;
  }

  async setUserData(userData: IUser): Promise<void> {
    this.clientStore.setItem('userData', userData);
  }

  async removeUserData(): Promise<void> {
    await this.clientStore.removeItem('userData');
  }
}
