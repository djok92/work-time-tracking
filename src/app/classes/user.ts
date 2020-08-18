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
      active: value.active,
      totalClockedTime: value.totalClockedTime || null,
      totalProductiveTime: value.totalProductiveTime || null,
      totalUnproductiveTime: value.totalUnproductiveTime || null,
      productivityRatio: value.productivityRatio || null,
      timeRecords: value.timeRecords || []
    });
  }
}
