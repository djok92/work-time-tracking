export interface TimeRecord {
  clockInTime: Date | string;
  clockOutTime: Date | string;
  productiveTime: number;
  unproductiveTime: number;
  neutralTime: number;
  totalTime: number;
}
