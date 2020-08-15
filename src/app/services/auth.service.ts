import { Injectable } from '@angular/core';
import { LoginRegistrationData } from '../interfaces/login-registration-data';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public checkIfUserNameAvailable(users: any[], username: string): boolean {
    return !users.some((user) => user.username === username);
  }

  public checkLoginCredentials(users: any[], loginData: LoginRegistrationData): boolean {
    return users.some((user: any) => user.username === loginData.username && user.password === loginData.password);
  }
}
