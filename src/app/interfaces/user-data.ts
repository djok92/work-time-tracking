import { TimeRecord } from './time-record';

export interface UserData {
  id: string;
  username: string;
  password: string;
  active: boolean;
  totalClockedTime: number;
  totalProductiveTime: number;
  totalUnproductiveTime: number;
  productivityRatio: number;
  timeRecords: TimeRecord[];
}
