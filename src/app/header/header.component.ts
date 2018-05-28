import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import * as M from 'materialize-css';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  item_count: number;

  constructor(private apiService :ApiserviceService) { }

  ngOnInit() {
    var elem = document.querySelector('.dropdown-trigger');
    var instance = M.Dropdown.init(elem, {});
    var side = document.querySelector('.sidenav');
    M.Sidenav.init(side, {}); 
  }
  openLoginModal() {

  }
  get cart_item$(){
    return this.apiService.items_in_cart;
  }
  get logged_in$(){
   return this.apiService.logged_in;
  }
  get userData$(){
    return this.apiService.user_data;
  }
  logout() {
    this.apiService.logout();
  }
}
