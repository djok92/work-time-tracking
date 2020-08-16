import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employees-summary',
  templateUrl: './employees-summary.component.html',
  styleUrls: ['./employees-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesSummaryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
