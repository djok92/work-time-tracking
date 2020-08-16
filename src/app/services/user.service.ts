import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { delay, map, scan, tap } from 'rxjs/operators';
import { User } from '../classes/user';
import { LoginRegistrationData } from '../interfaces/login-registration-data';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { TimeRecord } from '../interfaces/time-record';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  public getUsersFromJSON(): void {
    this.httpClient
      .get('/assets/users-small.json')
      .pipe(map((response: any) => response.map(this.mapUsers)))
      .subscribe((users: User[]) => {
        this.setUsers(users);
        this.apiService.setUsersToLocalStorage('users', users);
      });
  }

  public getUsers(): Observable<User[]> {
    return this.users$.asObservable().pipe(delay(250));
  }

  public setUsers(users: any[]): void {
    this.users$.next(users);
  }

  public getLoggedInUser(): Observable<User> {
    return this.loggedInUser$.asObservable();
  }

  public setLoggedInUser(loginData: LoginRegistrationData): void {
    const loggedInUser = this.users$.value.find(
      (user: User) => user.username === loginData.username && loginData.password === user.password
    );
    this.loggedInUser$.next(loggedInUser);
  }

  public getNumberOfUsers(): Observable<number> {
    return of(this.users$.value.length);
  }

  public getTotalClockedTime(): Observable<number> {
    return this.users$.pipe(
      map((users: User[]) =>
        users.map((user: User) => user.timeRecords.map((timeRecord: TimeRecord) => timeRecord.totalTime))
      ),
      map((totalHours: number[][]) => {
        return totalHours
          .reduce((acc: number[], curr: number[]) => acc.concat(curr), [])
          .reduce((acc: number, curr: number) => acc + curr);
      })
    );
  }

  public getTotalProductiveTime(): Observable<number> {
    return this.users$.pipe(
      map((users: User[]) =>
        users.map((user: User) => user.timeRecords.map((timeRecord: TimeRecord) => timeRecord.productiveTime))
      ),
      map((totalHours: number[][]) => {
        return totalHours
          .reduce((acc: number[], curr: number[]) => acc.concat(curr), [])
          .reduce((acc: number, curr: number) => acc + curr);
      })
    );
  }

  public getTotalUnproductiveTime(): Observable<number> {
    return this.users$.pipe(
      map((users: User[]) =>
        users.map((user: User) => user.timeRecords.map((timeRecord: TimeRecord) => timeRecord.unproductiveTime))
      ),
      map((totalHours: number[][]) => {
        return totalHours
          .reduce((acc: number[], curr: number[]) => acc.concat(curr), [])
          .reduce((acc: number, curr: number) => acc + curr);
      })
    );
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
