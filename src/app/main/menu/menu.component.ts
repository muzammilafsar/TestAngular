import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ApiserviceService} from '../../apiservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selected_route: String ;
  product_list;
  cart_count: number = 0 ;
  categories = [
    {
      name: 'Biryani',
      id: '5ad3754049e54509d40578f2',
      url:'biryani'
    },
    {
      name: 'Paratha Rolls',
      id: '5ad3756a59668a0e84223599',
      url:'paratharolls'
    },
    {
      name: 'Beverages',
      id: '5ad375a2164eac06b477d5c2',
      url:'beverages'
    },
    {
      name: 'Curries',
      id: '5ad375c06205f41ba42dbcf1',
      url:'curries'
    },
  ]
  constructor(private activatedRoute: ActivatedRoute, private apiService : ApiserviceService) {
    this.activatedRoute.params.subscribe(val=>{
      this.selected_route = val.category;
      // console.log(val.category);
      var cat_id = this.categories.findIndex(val=>{
        return val.url === this.selected_route
      })
      this.apiService.get_products_by_category(this.categories[cat_id].id).subscribe(val=>{
        // console.log(val.json());
        this.product_list = val['products'];
      });
    });
   }

  ngOnInit() {
    if(localStorage.getItem('cart')!==null){
      // console.log( JSON.parse(localStorage.getItem('cart')));
      this.cart_count = JSON.parse(localStorage.getItem('cart')).length;
    }
    
  }
  addToCart(val) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    // this.apiService.incrementCart();
    if(cart === null)
    { let arr = [];
      val.quantity = 1;
      arr.push(val);
      this.cart_count= this.cart_count + 1;
      this.apiService.incrementCart();
      localStorage.setItem('cart',JSON.stringify(arr));
    }
    else {
      // let cart=localStorage.getItem('cart');
      let i = cart.findIndex(pro=>{
          return pro._id === val._id; 
      });
      if (i >= 0)
      {
        if ( cart[i].quantity) {
          cart[i].quantity = cart[i].quantity + 1;
        }
      }
      else {
        val.quantity = 1; 
        cart.push(val);
        this.apiService.incrementCart();        
        this.cart_count= this.cart_count + 1;
      }
      // cart.push(val);
      localStorage.setItem('cart',JSON.stringify(cart));
    }  
    // console.log(cart);

  }

}
