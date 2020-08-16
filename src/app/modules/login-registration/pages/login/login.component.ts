import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginRegistrationData } from 'src/app/interfaces/login-registration-data';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public users: User[];

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

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
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
