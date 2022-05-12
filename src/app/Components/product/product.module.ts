import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreProductComponent } from './explore-product/explore-product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImagePopUpComponent } from './image-pop-up/image-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import{MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './cart/cart.component'
import { FormsModule } from '@angular/forms';


//Product/Explore
//Product/PTable
const routes:Routes=[
  {path:'', redirectTo:'/Product/Explore', pathMatch:'full'},
  {path: 'Explore', component:ExploreProductComponent},
  {path: 'PTable', component:ProductTableComponent},
  {path: 'Cart', component:CartComponent},


]

@NgModule({
  declarations: [
    ExploreProductComponent,
    ProductTableComponent,
    ImagePopUpComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule
  ]
})
export class ProductModule { }
