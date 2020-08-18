import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  public userProfileToBeDisplayed: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id: string) => this.userService.getUserById(id)),
        take(1),
        tap((user: User) => console.log(user))
      )
      .subscribe((user: User) => (this.userProfileToBeDisplayed = user));
  }
}
