import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { zip, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public totalUsers: number;
  public totalClockedTime: number;
  public totalProductiveTime: number;
  public totalUnproductiveTime: number;

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
        console.log(this.totalUnproductiveTime);
      });
  }

  ngOnDestroy(): void {
    // this.destroy$.next(true);
    // this.destroy$.complete();
  }
}
