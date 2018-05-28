import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './apiservice.service';
import * as $ from 'jquery';
import * as M from 'materialize-css';
// import M from '../../node_modules/materialize-css/dist/js/materialize';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private apiService:ApiserviceService) {
    this.apiService.setCart();
  }

  ngOnInit() {
    M.AutoInit();
    this.apiService.checkLogin();
  }
}
