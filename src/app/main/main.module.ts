import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {Routes, RouterModule} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppModule } from '../app.module';
import { ApiserviceService } from '../apiservice.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
const AppRoutes: Routes = [
  {
    path: '' ,
    component: HomepageComponent
  },
  {
    path:'menu/:category',
    component: MenuComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,         
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  declarations: [HomepageComponent, MenuComponent, CartComponent, CheckoutComponent, ProductDetailComponent],
  providers:[ApiserviceService]
})
export class MainModule { }
