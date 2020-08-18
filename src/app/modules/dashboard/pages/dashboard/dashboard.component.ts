import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { zip, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
// import { PaginationData } from 'src/app/interfaces/pagination-data';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortData } from 'src/app/interfaces/sort-data';
import { DisplayModeData } from 'src/app/interfaces/display-mode-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public users: User[];
  public batchOfUsers: User[];
  public usersLength: number;
  public totalUsersNumber: number;
  public totalClockedTime: number;
  public totalProductiveTime: number;
  public totalUnproductiveTime: number;
  public tableColumnNames = [
    'Name',
    'Total Clocked in time',
    'Total Productive time',
    'Total Unproductive time',
    'Productivity ratio',
    'See more details'
  ];

  public tableForm: FormGroup;

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.tableForm = this.formBuilder.group({
      searchValue: ''
    });
  }

  ngOnInit(): void {
    zip(
      this.userService.getNumberOfUsers(),
      this.userService.getTotalClockedTime(),
      this.userService.getTotalProductiveTime(),
      this.userService.getTotalUnproductiveTime()
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number[]) => {
        this.totalUsersNumber = data[0];
        this.totalClockedTime = data[1];
        this.totalProductiveTime = data[2];
        this.totalUnproductiveTime = data[3];
      });

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => (this.users = users));
  }

  public navigateToEmployeeProfile(user: User): void {
    this.router.navigate([`employee/${user.id}`]);
  }

  public getFilteredUsers(searchValue: string): void {
    this.userService
      .filterUsersByUsername(searchValue)
      .pipe(take(1))
      .subscribe((users: User[]) => {
        this.users = [...users];
      });
  }

  public getSortedUsers(sortData: SortData): void {
    this.users = [...this.userService.sortUsersByProperty(this.users, sortData)];
  }

  public getUsersByDisplayMode(displayModeData: DisplayModeData): void {
    this.userService
      .filterUsersByActiveStatus(displayModeData.displayActiveUsersMode)
      .pipe(take(1))
      .subscribe(
        (users: User[]) => (this.users = [...this.userService.sortUsersByProperty(users, displayModeData.sortData)])
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
