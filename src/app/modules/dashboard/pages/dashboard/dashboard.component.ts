import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { zip, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
import { PaginationData } from 'src/app/interfaces/pagination-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public users: User[];
  public batchOfUsers: User[];
  public usersLength: number;
  public totalUsers: number;
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

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    zip(
      this.userService.getNumberOfUsers(),
      this.userService.getTotalClockedTime(),
      this.userService.getTotalProductiveTime(),
      this.userService.getTotalUnproductiveTime()
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number[]) => {
        this.totalUsers = data[0];
        this.totalClockedTime = data[1];
        this.totalProductiveTime = data[2];
        this.totalUnproductiveTime = data[3];
      });

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => (this.users = users));
  }

  public getBatch(paginationData: PaginationData): void {
    console.log('fired');
    this.userService
      .getBatchOfUsers(
        paginationData.pageIndex * paginationData.pageSize,
        paginationData.pageIndex * paginationData.pageSize + paginationData.pageSize
      )
      .pipe(take(1))
      .subscribe((users: User[]) => {
        this.batchOfUsers = Object.assign([], users);
      });
  }

  public setUserForMoreDetails(user: User): void {
    console.log(user);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
