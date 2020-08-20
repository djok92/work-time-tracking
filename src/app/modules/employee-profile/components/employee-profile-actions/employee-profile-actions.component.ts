import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/classes/user';
import { FormGroup } from '@angular/forms';
import { TimeRecord } from 'src/app/interfaces/time-record';

@Component({
  selector: 'app-employee-profile-actions',
  templateUrl: './employee-profile-actions.component.html',
  styleUrls: ['./employee-profile-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeProfileActionsComponent implements OnInit {
  @Input()
  userProfileToBeDisplayed: User[];
  @Input()
  form: FormGroup;

  @Output()
  emitFormValues: EventEmitter<TimeRecord> = new EventEmitter<TimeRecord>();

  constructor() {}

  ngOnInit(): void {}

  public runEmitFormValues(): void {
    this.emitFormValues.emit(this.form.value);
  }
}
