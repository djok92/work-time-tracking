import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  public sortUsersByStringProperty(dataSource: User[], propertyName: string, sortOrder: 'asc' | 'desc'): User[] {
    return sortOrder === 'desc'
      ? dataSource.sort((a: User, b: User) => a[propertyName].localeCompare(b[propertyName]))
      : dataSource.sort((a: User, b: User) => b[propertyName].localeCompare(a[propertyName]));
  }

  public sortUsersByNumericProperty(dataSource: User[], propertyName: string, sortOrder: 'asc' | 'desc'): User[] {
    return sortOrder === 'desc'
      ? dataSource.sort((a: User, b: User) => b[propertyName] - a[propertyName])
      : dataSource.sort((a: User, b: User) => a[propertyName] - b[propertyName]);
  }
}
