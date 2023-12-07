import { ProductCategory } from "./ProductCategory";

export interface Product{
  
         productId : number,
         imageUrl : string,
         description : string,
         name : string,
         creationDate : Date,
         lastUpdate : Date,
         category : ProductCategory,
         more_horiz:string;
  
     

}