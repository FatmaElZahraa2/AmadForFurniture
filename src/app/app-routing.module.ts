import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  {path:'Home', component:HomeComponent},
{
  path: 'Product',
  loadChildren: () => import('src/app/Components/product/product.module').then(m => m.ProductModule)
},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
