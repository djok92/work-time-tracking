import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginRegistrationData } from 'src/app/interfaces/login-registration-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public users: any[];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
      ]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  public loginUser(formData: LoginRegistrationData): void {
    const areCredentialsValid = this.authService.checkLoginCredentials(this.users, formData);
    if (areCredentialsValid) {
      this.userService.setLoggedInUser(formData);
    } else {
      console.log('login validation error');
    }
  }
}
