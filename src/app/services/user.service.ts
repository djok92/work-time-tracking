import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private loggedInUser$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  public getUsers(): Observable<any> {
    return this.users$.asObservable().pipe(delay(250));
  }

  public setUsers(data: any): void {
    this.users$.next(data);
  }

  public getLoggedInUser(): Observable<any> {
    return this.loggedInUser$.asObservable();
  }

  public setLoggedInUser(data: any): void {
    const loggedInUser = this.users$.value.find(
      (user: any) => user.username === data.username && user.password === data.password
    );
    console.log(loggedInUser);
    this.loggedInUser$.next(loggedInUser);
  }
}
