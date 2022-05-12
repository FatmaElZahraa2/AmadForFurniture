import { Component, OnInit ,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductApiService } from 'src/app/Services/product-api.service';

@Component({
  selector: 'app-image-pop-up',
  templateUrl: './image-pop-up.component.html',
  styleUrls: ['./image-pop-up.component.scss']
})
export class ImagePopUpComponent implements OnInit {

  URL:SafeUrl="";
  Product:IProduct | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data:number , private ProductApiService:ProductApiService, private Sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this.ProductApiService.GetByID(this.data).subscribe(ReceivedProduct=>{
      this.URL=this.Sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ReceivedProduct.image)
    })
  }

}
