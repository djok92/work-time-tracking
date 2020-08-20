import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-profile-information',
  templateUrl: './employee-profile-information.component.html',
  styleUrls: ['./employee-profile-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileInformationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
