import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginRegistrationData } from 'src/app/interfaces/login-registration-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input()
  form: FormGroup;
  @Input()
  formName: string;

  @Output()
  emitFormValues: EventEmitter<LoginRegistrationData> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public runEmitFormValues(): void {
    if (this.form.valid) {
      this.emitFormValues.emit(this.form.value);
    } else {
      console.log('form validation error');
    }
  }
}
