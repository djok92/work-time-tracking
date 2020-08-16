import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../classes/user';
import { LoginRegistrationData } from '../interfaces/login-registration-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() {}

  public getUsers(): Observable<User[]> {
    return this.users$.asObservable().pipe(delay(250));
  }

  public setUsers(users: any[]): void {
    this.users$.next(users.map(this.mapUsers));
  }

  public getLoggedInUser(): Observable<User> {
    return this.loggedInUser$.asObservable();
  }

  public setLoggedInUser(loginData: LoginRegistrationData): void {
    const loggedInUser = this.users$.value.find(
      (user: User) => user.username === loginData.username && loginData.password === user.password
    );
    console.log(loggedInUser);
    this.loggedInUser$.next(loggedInUser);
  }

  private mapUsers(userData: any): User {
    return new User({
      id: userData.id,
      username: userData.username,
      password: userData.password,
      active: userData.active,
      timeRecords: userData.timeRecords
    });
  }
}
