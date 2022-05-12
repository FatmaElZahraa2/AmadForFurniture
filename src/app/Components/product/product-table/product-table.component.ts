import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IProduct } from 'src/app/Models/iproduct';
import { IOrderedProduct } from 'src/app/Models/iordered-product';

import { ProductApiService } from 'src/app/Services/product-api.service';
// import { Router } from '@angular/router';
import { createDirectiveTypeParams } from '@angular/compiler/src/render3/view/compiler';
import { UpdateWithoutReloadService } from 'src/app/Services/update-without-reload.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  ProductList:IProduct[]=[];
  InputValue:number=0;

  constructor(private ProductApiService:ProductApiService , private Sanitizer:DomSanitizer , private Update: UpdateWithoutReloadService) { }

  ngOnInit(): void {

    this.ProductApiService.GetAll().subscribe(ReceivedProducts=>{
      this.ProductList=ReceivedProducts;

      this.ProductList.forEach(Pro => {
        Pro.imageUrl=this.Sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+Pro.image);
      });

    })

  }

  fun(){
    console.log("Hello");
  }
  OrderdedProduct!:IOrderedProduct;
  CartProdutcs:any=[]
  AddToCart(Product:IProduct,NeddedQunatity:number){

    if(Product!=null){
    this.Transfer_Data(Product,NeddedQunatity);

    let DataLocalStorage=localStorage.getItem('ShoppingCart');
    if(DataLocalStorage==null){

     // let StoredOrderedProducts:IOrderedProduct[]=[];
      this.CartProdutcs.push(this.OrderdedProduct);
      localStorage.setItem('ShoppingCart',JSON.stringify(this.CartProdutcs));
    }else{

      var ID=this.OrderdedProduct.id;
      let idx:number=-1;
      this.CartProdutcs=JSON.parse(localStorage.getItem('ShoppingCart') || '{}');
      for(let i = 0 ; i< this.CartProdutcs.length;i++){
        if(ID==parseInt(this.CartProdutcs[i].id)){
          this.CartProdutcs[i].neededQunantity=this.OrderdedProduct.neededQunantity;
          idx=i;
          break;
        }
      }
      if(idx==-1){
        this.CartProdutcs.push(this.OrderdedProduct);

      }
      localStorage.setItem('ShoppingCart',JSON.stringify(this.CartProdutcs));
    }


    }
    // this.Router.navigate(['/Product/PTable']).then(() => {
    //   window.location.reload();
    // });

    this.CartItemsNUmber();
  }




  Transfer_Data(Product:IProduct ,NeddedQunatity:number ):void{

    this.OrderdedProduct={
      id:Product.id,
      name:Product.name,
      image:Product.image,
      imageUrl:Product.imageUrl,
      neededQunantity:NeddedQunatity,
      price:Product.price,
      cateogryId:Product.cateogryId,
      quantity:Product.quantity

    }
  }

  NumberOfItemsInCart:number=0;
  CartItemsNUmber(){
    var CartItemsList= JSON.parse(localStorage.getItem('ShoppingCart') ||'{}');
    var CartItemsListLen=CartItemsList.length
    this.Update.CartSubject.next(CartItemsListLen);
  }


}



