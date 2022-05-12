import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IOrderedProduct } from 'src/app/Models/iordered-product';
import { IProduct } from 'src/app/Models/iproduct';
import { IUpdateProduct } from 'src/app/Models/iupdate-product';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { UpdateWithoutReloadService } from 'src/app/Services/update-without-reload.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  OrderedProductsList:IOrderedProduct[]=[];
  TotalPrice:number=0;
  constructor(private Sanitizer:DomSanitizer , private Update:UpdateWithoutReloadService , private PdoductApiService:ProductApiService) { }

  ngOnInit(): void {
    this.OrderedProductsList=JSON.parse(localStorage.getItem('ShoppingCart') ||'{}');

    this.OrderedProductsList.forEach(Pro => {
      Pro.imageUrl=this.Sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+Pro.image);
      this.TotalPrice+=(Pro.neededQunantity*Pro.price);
    });
  }

  OrderedProTempleateList:IOrderedProduct[]=[];
  DeleteFromCart(OrderdedProduct:IOrderedProduct){

    this.TotalPrice-=(OrderdedProduct.price*OrderdedProduct.neededQunantity);
    for(let i=0;i<this.OrderedProductsList.length;i++) {
      if(this.OrderedProductsList[i].id!=OrderdedProduct.id)
      this.OrderedProTempleateList.push(this.OrderedProductsList[i]);
    }

    this.OrderedProductsList=this.OrderedProTempleateList;

    this.OrderedProTempleateList=[];
    console.log(this.OrderedProductsList);
    localStorage.setItem('ShoppingCart',JSON.stringify(this.OrderedProductsList));

    this.CartItemsNUmber();
  }


  NumberOfItemsInCart:number=0;
  CartItemsNUmber(){
    var CartItemsList= JSON.parse(localStorage.getItem('ShoppingCart') ||'{}');
    var CartItemsListLen=CartItemsList.length
    this.Update.CartSubject.next(CartItemsListLen);
  }

  SendProductToUpdateService!:IUpdateProduct;
  PlaceOrder(){

    for(let i =0;i<this.OrderedProductsList.length;i++){

      this.SendProductToUpdateService={
        id:this.OrderedProductsList[i].id,
        name: this.OrderedProductsList[i].name,
        price: this.OrderedProductsList[i].price,
        quantity:this.OrderedProductsList[i].quantity-this.OrderedProductsList[i].neededQunantity,
        cateogryId:this.OrderedProductsList[i].cateogryId
      }
      console.log(this.SendProductToUpdateService)
      this.PdoductApiService.Update(this.OrderedProductsList[i].id , this.SendProductToUpdateService).subscribe();
    }
    this.TotalPrice=0;
    this.OrderedProductsList=[];
    localStorage.setItem('ShoppingCart',JSON.stringify(this.OrderedProductsList));

     this.CartItemsNUmber();
  }

}
