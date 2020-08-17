import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-employees-summary',
  templateUrl: './employees-summary.component.html',
  styleUrls: ['./employees-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesSummaryComponent implements OnInit {
  @Input()
  totalUsers: number;
  @Input()
  totalClockedTime: number;
  @Input()
  totalProductiveTime: number;
  @Input()
  totalUnproductiveTime: number;

  constructor() {}

  ngOnInit(): void {}
}
