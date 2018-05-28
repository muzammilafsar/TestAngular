import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'; 
import { ApiserviceService } from '../../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items = [];
  total_price: number = 0;
  addressForm: FormGroup;
  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
     if (this.apiService.items_in_cart > 0) {
        this.items = JSON.parse(localStorage.getItem('cart'));
     }
     this.calculateTotal$();
     M.AutoInit();
     this.addressForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required]),
      pincode: new FormControl('',[Validators.required]),
      locality: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      landmark: new FormControl('',[]),
      alt_mobile: new FormControl('',[]),
    });
  }
  increment(id) {
    let index = this.items.findIndex(val=> {
      return val._id == id;
    });
    this.items[index].quantity = this.items[index].quantity +1;
    localStorage.setItem('cart', JSON.stringify(this.items));
      this.calculateTotal$();
    }
    remove(id) {
      let index = this.items.findIndex(val=> {
        return val._id == id;
      });
      this.items.splice(index,1);
      this.apiService.items_in_cart--;this.calculateTotal$();
    }
  decrement(id) {

    let index = this.items.findIndex(val=> {
      return val._id == id;
    });
    if ((this.items[index].quantity - 1) > 0) {
    this.items[index].quantity = this.items[index].quantity - 1;
    } 
    else{
      this.items.splice(index,1);
      this.apiService.items_in_cart--;
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.calculateTotal$();
  }
  calculateTotal$() {
    let total = 0;
    this.items.map(val => {
      total = total + (val.selling_price * val.quantity);
    });
    this.total_price = total;
  }
  placeOrder() {  
    if (this.addressForm.valid) {
      this.apiService.createOrder({address: this.addressForm.value,
      items: this.items,
      user:this.apiService.user_data.email}).subscribe(val => {
        console.log(val);
      });
      }
  }
}
