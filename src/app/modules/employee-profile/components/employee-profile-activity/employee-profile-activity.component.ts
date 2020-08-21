import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartData } from 'src/app/interfaces/chart-data';

@Component({
  selector: 'app-employee-profile-activity',
  templateUrl: './employee-profile-activity.component.html',
  styleUrls: ['./employee-profile-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileActivityComponent implements OnInit {
  @Input()
  barChartData: ChartData[];
  @Input()
  barChartLabels: string[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  constructor() {}

  ngOnInit(): void {}
}
