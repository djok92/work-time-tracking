import { Injectable } from '@angular/core';
import { TimeRecord } from '../interfaces/time-record';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordService {
  constructor() {}

  public calculateTotalHoursForTimeRecord(timeRecord: TimeRecord): number {
    return timeRecord.productiveTime + timeRecord.unproductiveTime + timeRecord.neutralTime;
  }

  public convertDateToISOString(date: Date): string {
    return date.toISOString();
  }

  public reduceTimeProperty = (dataSource: TimeRecord[], propertyToReduce: string): number => {
    return dataSource
      .map((timeRecord: TimeRecord) => timeRecord[propertyToReduce])
      .reduce((acc: number, curr: number) => acc + curr);
  };
}
