import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRegistrationData } from 'src/app/interfaces/login-registration-data';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
      ]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  public createUser(formValues: LoginRegistrationData): void {
    const isUsernameAvailable = this.authService.checkIfUserNameAvailable(this.users, formValues.username);
    if (isUsernameAvailable) {
      this.apiService.createUser(formValues);
      this.router.navigate(['/login']);
    } else {
      this.registerForm.setErrors({ usernameNotAvailable: true });
    }
  }
}
