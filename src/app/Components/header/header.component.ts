import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateWithoutReloadService } from 'src/app/Services/update-without-reload.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  NumberofCartItems:number=0;
  constructor(private Update:UpdateWithoutReloadService ,private Router:Router) {

    this.Update.CartSubject.subscribe(Number=>{
      this.NumberofCartItems=Number;
    })
    this.AssignNumberOfItems();

  }

  ngOnInit(): void {
  }

  AssignNumberOfItems(){
    if(localStorage.getItem('ShoppingCart')!=null){
      this.NumberofCartItems=(JSON.parse(localStorage.getItem('ShoppingCart') ||'{}')).length;
    }
  }
  GoToShoppingCart(){
      this.Router.navigate(['/Product/Cart']);
  }

}
