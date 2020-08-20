import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-profile-activity',
  templateUrl: './employee-profile-activity.component.html',
  styleUrls: ['./employee-profile-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileActivityComponent implements OnInit {
  @Input()
  barChartData: any;
  @Input()
  barChartLabels: string[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.barChartData);
  }
}
