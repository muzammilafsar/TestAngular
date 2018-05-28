import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Router } from '@angular/router';
import { calcBindingFlags } from '@angular/core/src/view/util';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
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
  constructor(private apiService: ApiserviceService, private router: Router) {
    // this.apiService.get_categories();
  }
  baseUrl: string = "https://foodserveapp.herokuapp.com/";
  category;
  ngOnInit() {
    // this.apiService.get_categories().subscribe(val=>{
    //   console.log(val.json());
    // });
  }
  showMenu(event) {
    this.router.navigate(['menu']);
    // var target = event.target || event.srcElement || event.currentTarget;
    // var idAttr = target.attributes.id;
    // // var value = idAttr.nodeValue;
    // console.log(event.target.id);
    // console.log(event);

  }

}
