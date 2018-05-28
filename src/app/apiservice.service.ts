import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class ApiserviceService {
  categories: any ;
  base_url: string = 'https://foodserveapp.herokuapp.com/';
  items_in_cart: number = 0;
  logged_in: boolean = false;
  user_data;
  // base_url: string = 'http://localhost:3000/';
  
  
  constructor(private http : HttpClient) { }
  get_categories() {
    return this.http.get(`${this.base_url}category`);
  }
  get_products_by_category(id) {
    return this.http.get(`${this.base_url}productsbycategory`,{params:{
      category: id
    }});
  }
  incrementCart(){
    this.items_in_cart = this.items_in_cart + 1;
    console.log("working",this.items_in_cart);
  }
  setCart(){
  let cart = JSON.parse(localStorage.getItem('cart'));  
  if (cart) {
    this.items_in_cart = cart.length;
  }
  else {
    this.items_in_cart = 0;
  }
  console.log(cart);
  }
  checkLogin(){
    let data = localStorage.getItem('auth');
    if (data) 
    {
      this.logged_in = true;
      console.log("Logged In");
      this.user_data = JSON.parse(data);
    }
    else {
      console.log("not Logged In");
    }
  }
  setLogin() {
    this.logged_in = true;
  }
  localLogin(email,password) {
    return this.http.post(`${this.base_url}login`,{email: email, password: password});
  }
  registerUser(data) {
    console.log(data);
    return this.http.post(`${this.base_url}registeruser`,{name:data.name,email: data.email, password: data.password});
  }
  logout() {
    localStorage.clear();
    location.reload();
  }
  createOrder(body) {
    return this.http.post(`${this.base_url}neworder`,body);
  }
}
