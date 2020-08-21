import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'work-time-tracking';

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersFromJSON();
    this.apiService.setData('userLoggedIn', false);
  }
}
