import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { ImagePopUpComponent } from '../image-pop-up/image-pop-up.component';

@Component({
  selector: 'app-explore-product',
  templateUrl: './explore-product.component.html',
  styleUrls: ['./explore-product.component.scss']
})
export class ExploreProductComponent implements OnInit {

  ProductListForExploration:IProduct[]=[];
  ProductID:number=0;
  constructor(private ProductApiService:ProductApiService, private Sanitizer:DomSanitizer , private matDialog : MatDialog) { }

  ngOnInit(): void {
    this.ProductApiService.GetAll().subscribe(ReceivedData=>{
      this.ProductListForExploration=ReceivedData;

      this.ProductListForExploration.forEach(Pro => {
        Pro.imageUrl=this.Sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+Pro.image);
      });

    })
    console.log(this.ProductListForExploration)
  }

  OpenImageDialog(ProductID:number):void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=ProductID;
    this.matDialog.open(ImagePopUpComponent,dialogConfig);
  }



}
