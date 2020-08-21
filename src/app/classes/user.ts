import { TimeRecord } from '../interfaces/time-record';

export class User {
  id: string;
  username: string;
  password: string;
  active: boolean;
  totalClockedTime: number;
  totalProductiveTime: number;
  totalUnproductiveTime: number;
  productivityRatio: number;
  timeRecords: TimeRecord[];

  constructor(value: any = {}) {
    Object.assign(this, {
      id: value.id || null,
      username: value.username || null,
      password: value.password || null,
      active: value.active || null,
      totalClockedTime: value.totalClockedTime || 0,
      totalProductiveTime: value.totalProductiveTime || 0,
      totalUnproductiveTime: value.totalUnproductiveTime || 0,
      productivityRatio: value.productivityRatio || 0,
      timeRecords: value.timeRecords || []
    });
  }
}
