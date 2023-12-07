import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../common/Product';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoreService } from 'src/app/services/core.service';
import { TableColumn } from '../../components/table/TableColumn';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { _isNumberValue } from '@angular/cdk/coercion';
import { SortingDataAccessorService } from 'src/app/services/sorting-data-accessor.service';
import { Category } from 'src/app/common/Category.model';
import { dialogData } from 'src/app/components/table2/dialog-data';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})


export class ProductsComponent implements OnInit{
  
  Product!:Product[];
  data!:Product;
  ProDataSource=new MatTableDataSource<Product>(this.Product);
  ProDisplayedColumns: string[] = ['productId','name' ,'category.categoryName', 'description', 'lastUpdate','action'];
  dropdownItems: string[]=['Edit','Delete'];
  product="product";
  sortActive="productId";
  dialog = DialogComponent;
  hasAction=true;
  
  dialogProduct: dialogData={
    name: "EditProduct",
    title: "Update Product",
    actionButtonText: "Edit",
    data: this.data,
    endpoint:this.product,
    hasCategory:true,
    hasDescription:true,
    hasImage:true,
    hasName:true,
    hasCategoryName:false,
    arrayData:['name', 'description', 'imageUrl', 'category.categoryName'],
    idField:"productId"
  };
  filterValue!: string ;
  
  constructor(public productService: ProductService,
              private matDialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private _coreService: CoreService,
              private sortingService: SortingDataAccessorService) { }
  
  ngOnInit() {
     
  } 

  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.ProDataSource.filter = this.filterValue.trim().toLowerCase();

    this.ProDataSource.filterPredicate = (data: any, filter: string) => {
       const category = JSON.stringify(data.category.categoryName).toLowerCase();
       const name = JSON.stringify(data.name).toLowerCase();
       const description = JSON.stringify(data.description).toLowerCase();
       const lastUpdate = JSON.stringify(data.lastUpdate).toLowerCase();
       filter = filter.toLowerCase(); 
      return      category.includes(filter) 
               || name.includes(filter) 
               || description.includes(filter) 
               || lastUpdate.includes(filter);
    };
  } 
  
  openDialogCreate(): void{
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    
    dialogConfig.data = {
      name: "CreateProduct",
      title: "Create Product",
      actionButtonText: "Create",
      endpoint:"product",
      // dialog has these fields: 
      hasCategory:true,
      hasDescription:true,
      hasImage:true,
      hasName:true,
      hasCategoryName:false,
      arrayData:['name', 'description', 'imageUrl', 'category.categoryName']
    }
  
    const dialogRef = this.matDialog.open(DialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
      
    } )
  }

}


