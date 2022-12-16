import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/services/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any = [];
  constructor(private ApiService: ApiserviceService) {

  }
  ngOnInit() {
    //get all users counts
    this.ApiService.getUsers().subscribe((data: any) => {
      if (data && data.length) {
        this.users = data && data.length ? data : [];
      }
    })
  }
}
