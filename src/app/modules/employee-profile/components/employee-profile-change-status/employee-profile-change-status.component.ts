import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-profile-change-status',
  templateUrl: './employee-profile-change-status.component.html',
  styleUrls: ['./employee-profile-change-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileChangeStatusComponent implements OnInit {
  @Input()
  isUserProfileActive: boolean;

  @Output()
  emitStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public runEmitStatusChange(): void {
    this.emitStatusChange.emit();
  }
}
