import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isUserLoggedIn: boolean = this.authService.getLoginStatus();

    if (!isUserLoggedIn) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
