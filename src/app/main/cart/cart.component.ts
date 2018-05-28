import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = [];
  total_price: number = 0;
  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
     if (this.apiService.items_in_cart > 0) {
        this.items = JSON.parse(localStorage.getItem('cart'));
     }
     this.calculateTotal$();
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
}
