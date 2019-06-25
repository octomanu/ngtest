import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: _HttpClient
  ) { }
  public orderableList = ['Item 1b', 'Item 2b', 'Item 3b'];
  ngOnInit() {
  }

}
