import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../classes/user';
import { LoginRegistrationData } from '../interfaces/login-registration-data';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { TimeRecord } from '../interfaces/time-record';
import { UserData } from '../interfaces/user-data';
import { SortData } from '../interfaces/sort-data';

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
      .pipe(map((response: UserData[]) => response.map(this.mapUsers)))
      .subscribe((users: User[]) => {
        this.setUsers(users);
        this.apiService.setUsersToLocalStorage('users', users);
      });
  }

  public getUsers(): Observable<User[]> {
    return this.users$.asObservable().pipe(delay(250));
  }

  public getUserById(id: string): Observable<User> {
    return of(this.users$.value.find((user: User) => user.id === id));
  }

  public setUsers(users: User[]): void {
    this.users$.next(users);
  }

  public createUser(userData: LoginRegistrationData): void {
    this.users$.next([...this.users$.value, new User(userData)]);
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

  public sortUsersByProperty(dataSource: User[], sortData: SortData): User[] {
    console.log(sortData);
    const sortProperty = this.mapTableHeaderNamesToProperties(sortData.active);
    console.log(sortProperty.type);
    if (sortProperty.type === 'string') {
      return this.sortUsersByStringProperty(dataSource, sortProperty.property, sortData.direction);
    } else {
      return this.sortUsersByNumericProperty(dataSource, sortProperty.property, sortData.direction);
    }
  }

  public filterUsersByUsername(searchValue: string): Observable<User[]> {
    return this.users$.pipe(
      map((users: User[]) => users.filter((user: User) => user.username.toLowerCase().includes(searchValue)))
    );
  }

  public filterUsersByActiveStatus(isActiveUsersMode: boolean): Observable<User[]> {
    return this.users$.pipe(
      map((users: User[]) => users.filter((user: User) => (isActiveUsersMode ? user.active : !user.active)))
    );
  }

  private mapTableHeaderNamesToProperties(
    tableHeaderName: string
  ): { property: string; type: 'string' | 'number' } | null {
    switch (tableHeaderName) {
      case 'Name':
        return {
          property: 'username',
          type: 'string'
        };
      case 'Total Clocked in time':
        return {
          property: 'totalClockedTime',
          type: 'number'
        };
      case 'Total Productive time':
        return {
          property: 'totalProductiveTime',
          type: 'number'
        };
      case 'Total Unproductive time':
        return {
          property: 'totalUnproductiveTime',
          type: 'number'
        };
      case 'Productivity ratio':
        return {
          property: 'productivityRatio',
          type: 'number'
        };
      default:
        return null;
    }
  }

  private sortUsersByStringProperty(dataSource: User[], propertyName: string, sortOrder: 'asc' | 'desc'): User[] {
    return sortOrder === 'desc'
      ? dataSource.sort((a: User, b: User) => a[propertyName].localeCompare(b[propertyName]))
      : dataSource.sort((a: User, b: User) => b[propertyName].localeCompare(a[propertyName]));
  }

  private sortUsersByNumericProperty(dataSource: User[], propertyName: string, sortOrder: 'asc' | 'desc'): User[] {
    return sortOrder === 'desc'
      ? dataSource.sort((a: User, b: User) => b[propertyName] - a[propertyName])
      : dataSource.sort((a: User, b: User) => a[propertyName] - b[propertyName]);
  }

  private reduceTimeProperty = (dataSource: TimeRecord[], propertyToReduce: string): number => {
    return dataSource
      .map((timeRecord: TimeRecord) => timeRecord[propertyToReduce])
      .reduce((acc: number, curr: number) => acc + curr);
  };

  private mapUsers = (userData: UserData): User => {
    return new User({
      id: userData.id,
      username: userData.username,
      password: userData.password,
      active: userData.active,
      totalClockedTime: this.reduceTimeProperty(userData.timeRecords, 'totalTime'),
      totalProductiveTime: this.reduceTimeProperty(userData.timeRecords, 'productiveTime'),
      totalUnproductiveTime: this.reduceTimeProperty(userData.timeRecords, 'unproductiveTime'),
      productivityRatio: (
        this.reduceTimeProperty(userData.timeRecords, 'productiveTime') /
        this.reduceTimeProperty(userData.timeRecords, 'unproductiveTime')
      ).toFixed(2),
      timeRecords: userData.timeRecords
    });
  };
}
