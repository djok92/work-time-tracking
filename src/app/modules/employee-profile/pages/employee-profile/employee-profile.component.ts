import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeRecord } from 'src/app/interfaces/time-record';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  public userProfileToBeDisplayed: User;
  public addTimeRecordForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {
    this.addTimeRecordForm = this.formBuilder.group({
      clockInTime: ['', Validators.required],
      clockOutTime: ['', Validators.required],
      productiveTime: [null, Validators.required],
      unproductiveTime: [null, Validators.required],
      neutralTime: [null, Validators.required],
      totalTime: [null, Validators.required]
    });
  }

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

  public addTimeRecordForUser(timeRecord: TimeRecord): void {
    this.userService.addTimeRecord(this.userProfileToBeDisplayed, timeRecord);
  }
}
