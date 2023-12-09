import { Product } from "./Product";

export interface Category {
        
         categoryId:number;
         categoryName:string;
         creation_date:Date; 
         product:Product
}
