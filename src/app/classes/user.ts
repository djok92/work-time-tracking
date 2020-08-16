import { TimeRecord } from '../interfaces/time-record';

export class User {
  id: number;
  username: string;
  password: string;
  active: boolean;
  timeRecords: TimeRecord[];

  constructor(value: any = {}) {
    Object.assign(this, {
      id: value.id,
      username: value.username || null,
      password: value.password || null,
      active: value.active,
      timeRecords: value.timeRecords || null
    });
  }
}
