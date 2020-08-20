import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeRecord } from 'src/app/interfaces/time-record';
import { TimeRecordService } from 'src/app/services/time-record.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {
  public userProfileToBeDisplayed: User;
  public addTimeRecordForm: FormGroup;
  public barChartData: any;
  public barChartLabels: string[];

  private destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private timeRecordService: TimeRecordService
  ) {
    this.addTimeRecordForm = this.formBuilder.group({
      clockInTime: ['', Validators.required],
      clockOutTime: ['', Validators.required],
      productiveTime: [null, Validators.required],
      unproductiveTime: [null, Validators.required],
      neutralTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        take(1),
        map((params: Params) => params.id),
        tap((id: string) => {
          this.userService.setActiveUserProfile(id);
        })
      )
      .subscribe();

    this.userService
      .getActiveUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.userProfileToBeDisplayed = user;
        this.barChartData = this.timeRecordService.mapTimeRecordDataForChart(this.userProfileToBeDisplayed.timeRecords);
        this.barChartLabels = this.timeRecordService.makeChartLabelFromDate(this.userProfileToBeDisplayed.timeRecords);
      });
  }

  public changeDisplayedUserProfileStatus(): void {
    this.userService
      .changeUserStatus(this.userProfileToBeDisplayed.id)
      .pipe(take(1))
      .subscribe((user: User) => (this.userProfileToBeDisplayed = { ...user }));
  }

  public addTimeRecordForUser(timeRecord: TimeRecord): void {
    const areDifferenceAndTotalsValid = this.timeRecordService.calculateIfValidTimeDifferenceAndTotal(timeRecord);
    if (areDifferenceAndTotalsValid) {
      this.userService.addTimeRecord(this.userProfileToBeDisplayed, timeRecord);
      this.addTimeRecordForm.reset();
    } else {
      this.addTimeRecordForm.setErrors({ totalsAndDifferenceNotValid: true });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
