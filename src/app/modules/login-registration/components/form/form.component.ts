import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
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
  formName: 'Login' | 'Register';

  @Output()
  emitFormValues: EventEmitter<LoginRegistrationData> = new EventEmitter();

  get usernameControl(): AbstractControl {
    return this.form.controls['username'];
  }

  get passwordControl(): AbstractControl {
    return this.form.controls['password'];
  }

  constructor() {}

  ngOnInit(): void {}

  public runEmitFormValues(): void {
    if (this.form.valid) {
      this.emitFormValues.emit(this.form.value);
    }
  }
}
