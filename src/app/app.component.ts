import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'work-time-tracking';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.setUsers('users', [
      { username: 'djok92', password: 'Djokulemancar123!!' },
      { username: 'anakin', password: 'PeniHardavej1!' }
    ]);
  }
}
