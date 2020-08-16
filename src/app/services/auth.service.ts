import { Injectable } from '@angular/core';
import { LoginRegistrationData } from '../interfaces/login-registration-data';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  public checkIfUserNameAvailable(users: any[], username: string): boolean {
    return !users.some((user) => user.username === username);
  }

  public checkLoginCredentials(users: any[], loginData: LoginRegistrationData): boolean {
    return users.some((user: any) => user.username === loginData.username && user.password === loginData.password);
  }

  public getLoginStatus(): boolean {
    return JSON.parse(this.apiService.getData('userLoggedIn'));
  }

  public setLoginStatus(status: boolean): void {
    this.apiService.setData('userLoggedIn', status);
  }
}
