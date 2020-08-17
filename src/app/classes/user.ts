import { TimeRecord } from '../interfaces/time-record';

export class User {
  id: number;
  username: string;
  password: string;
  active: boolean;
  totalClockedTime: number;
  totalProductiveTime: number;
  totalUnproductiveTime: number;
  timeRecords: TimeRecord[];

  constructor(value: any = {}) {
    Object.assign(this, {
      id: value.id || null,
      username: value.username || null,
      password: value.password || null,
      active: value.active,
      totalClockedTime: value.totalClockedTime,
      totalProductiveTime: value.totalProductiveTime,
      totalUnproductiveTime: value.totalUnproductiveTime,
      timeRecords: value.timeRecords || null
    });
  }
}
