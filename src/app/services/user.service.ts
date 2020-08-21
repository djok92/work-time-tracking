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
import { TimeRecordService } from './time-record.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private activeUserProfile$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private timeRecordService: TimeRecordService,
    private utilService: UtilService
  ) {}

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

  public setActiveUserProfile(id: string): void {
    const activeUserProfile = this.users$.value.find((user: User) => user.id === id);
    this.activeUserProfile$.next(activeUserProfile);
  }

  public getActiveUserProfile(): Observable<User> {
    return this.activeUserProfile$.asObservable();
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

  public sortUsersByPropertyHandler(dataSource: User[], sortData: SortData): User[] {
    const sortProperty = this.mapTableHeaderNamesToProperties(sortData.active);
    if (sortProperty.type === 'string') {
      return this.utilService.sortUsersByStringProperty(dataSource, sortProperty.property, sortData.direction);
    } else {
      return this.utilService.sortUsersByNumericProperty(dataSource, sortProperty.property, sortData.direction);
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

  public changeUserStatus(userId: string): Observable<User> {
    return of(
      this.users$.value.find((user: User) => {
        if (user.id === userId) {
          user.active = !user.active;
          return user;
        }
      })
    );
  }

  public addTimeRecord(activeUser: User, timeRecord: TimeRecord): void {
    const userToAddTimeRecord = this.users$.value.find((user: User) => user.id === activeUser.id);
    timeRecord.clockInTime = this.timeRecordService.convertDateToISOString(new Date(timeRecord.clockInTime));
    timeRecord.clockOutTime = this.timeRecordService.convertDateToISOString(new Date(timeRecord.clockOutTime));
    timeRecord.totalTime = this.timeRecordService.calculateTotalHoursForTimeRecord(timeRecord);
    userToAddTimeRecord.timeRecords = [...userToAddTimeRecord.timeRecords, timeRecord];
    console.log(this.users$.value);
    this.activeUserProfile$.next(userToAddTimeRecord);
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

  private mapUsers = (userData: UserData): User => {
    return new User({
      id: userData.id,
      username: userData.username,
      password: userData.password,
      active: userData.active,
      totalClockedTime: this.timeRecordService.reduceTimeProperty(userData.timeRecords, 'totalTime'),
      totalProductiveTime: this.timeRecordService.reduceTimeProperty(userData.timeRecords, 'productiveTime'),
      totalUnproductiveTime: this.timeRecordService.reduceTimeProperty(userData.timeRecords, 'unproductiveTime'),
      productivityRatio: (
        this.timeRecordService.reduceTimeProperty(userData.timeRecords, 'productiveTime') /
        this.timeRecordService.reduceTimeProperty(userData.timeRecords, 'unproductiveTime')
      ).toFixed(2),
      timeRecords: userData.timeRecords
    });
  };
}
