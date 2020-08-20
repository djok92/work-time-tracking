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

  public calculateIfValidTimeDifferenceAndTotal(timeRecord: TimeRecord): boolean {
    return (
      timeRecord.productiveTime + timeRecord.unproductiveTime + timeRecord.neutralTime <=
      Math.abs(new Date(timeRecord.clockOutTime).getTime() - new Date(timeRecord.clockInTime).getTime()) /
        (60 * 60 * 1000)
    );
  }

  public mapTimeRecordDataForChart(timeRecords: TimeRecord[]): any[] {
    let productiveTime = [];
    let unproductiveTime = [];
    let neutralTime = [];
    timeRecords.forEach((timeRecord: TimeRecord) => {
      productiveTime = [...productiveTime, timeRecord.productiveTime];
      unproductiveTime = [...unproductiveTime, timeRecord.unproductiveTime];
      neutralTime = [...neutralTime, timeRecord.neutralTime];
    });
    return [
      {
        data: productiveTime,
        label: 'Productive Time'
      },
      { data: unproductiveTime, label: 'Unproductive Time' },
      {
        data: neutralTime,
        label: 'Neutral Time'
      }
    ];
  }

  public makeChartLabelFromDate(timeRecords: TimeRecord[]): string[] {
    return timeRecords.map((timeRecord: TimeRecord) =>
      new Date(timeRecord.clockInTime).toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    );
  }
}
