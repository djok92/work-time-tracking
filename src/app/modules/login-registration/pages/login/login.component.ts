import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginRegistrationData } from 'src/app/interfaces/login-registration-data';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  public loginUser(formData: LoginRegistrationData): void {
    const areCredentialsValid = this.authService.checkLoginCredentials(this.users, formData);
    if (areCredentialsValid) {
      this.userService.setLoggedInUser(formData);
      this.authService.setLoginStatus(true);
      this.router.navigate(['dashboard']);
    } else {
      this.loginForm.setErrors({ invalidCredentials: true });
    }
  }
}
