import { Injectable } from '@angular/core';
import{HttpClient , HttpHeaders} from '@angular/common/http'
import { IProduct } from '../Models/iproduct';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUpdateProduct } from '../Models/iupdate-product';
@Injectable({
  providedIn: 'any'
})
export class ProductApiService {

  private httpOptions;
  Message:string="Saad :(";
  constructor(private httpclient:HttpClient) {
    this.httpOptions={

      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      })
    }

   }

   GetAll():Observable<IUpdateProduct[]>{

    return this.httpclient.get<IUpdateProduct[]>(`${environment.ApiUrl}/Products`);
   }
   GetByID(ProID:number):Observable<IUpdateProduct>{

    return this.httpclient.get<IUpdateProduct>(`${environment.ApiUrl}/Products/${ProID}`);
   }
   Update(ProID:number , Product:IUpdateProduct):Observable<IUpdateProduct>{
    var formData: any = new FormData();
    formData.append("id", Product.id);
    formData.append("name", Product.name);
    formData.append("price", Product.price);
    formData.append("quantity", Product.quantity);
    return this.httpclient.put<IUpdateProduct>(`${environment.ApiUrl}/Products/${ProID}`,(formData));
   }

}
