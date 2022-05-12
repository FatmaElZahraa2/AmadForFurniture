import { SafeUrl } from "@angular/platform-browser";


export interface IProduct {
  id:number;
  name: string;
  price: number;
  quantity:number;
  image?:string;
  imageUrl?:SafeUrl;
  cateogryId?:number;
}
