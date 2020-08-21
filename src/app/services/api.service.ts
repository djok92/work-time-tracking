import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  public setUsersToLocalStorage(key: string, data: UserData[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any {
    return localStorage.getItem(key);
  }

  public setData(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeData(key: string): void {
    return localStorage.removeItem(key);
  }

  public patchData(data: unknown, key: string): void {
    const storedData = JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify([...storedData, data]));
  }
}
