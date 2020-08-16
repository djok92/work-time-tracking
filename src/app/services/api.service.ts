import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public setUsers(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.userService.setUsers(data);
  }

  public getData(key: string): any {
    return localStorage.getItem(key);
  }

  public setData(key: string, data: any): any {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeData(key: string): void {
    return localStorage.removeItem(key);
  }

  public createUser(data: any): void {
    const users = JSON.parse(localStorage.getItem('users'));
    localStorage.setItem('users', JSON.stringify([...users, data]));
    this.userService.setUsers([...users, data]);
  }
}
