import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  public setUsersToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
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
    // this.userService.setUsers([...users, data]);
  }
}
