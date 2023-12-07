import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ProductCategory } from 'src/app/common/ProductCategory';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/Category.service';
import { Category } from 'src/app/common/Category.model';
import { dialogData } from 'src/app/components/table2/dialog-data';
import { ApiService } from 'src/app/services/apiService';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss'],
})

export class ProductsCategoriesComponent implements OnInit {
  CategoryProduct!:Category[];
  data!:ProductCategory;
  CatDataSource=new MatTableDataSource<Category>(this.CategoryProduct);
  CatDisplayedColumns: string[] = ['categoryId' ,'categoryName','ProductNum','CreationDate', 'action'];
  dropdownItems: string[]=['Edit','Delete'];
  category="product_category";
  sortActive="categoryId";
  dialog = DialogComponent;
  hasAction=true;
  
  dialogCategory: dialogData={
    name:"EditCategory",
    title: "Update Category",
    actionButtonText: "Edit",
    data:this.data,
    endpoint:this.category,
    hasCategory:false,
    hasDescription:false,
    hasImage:false,
    hasName:false,
    hasCategoryName:true,
    arrayData:['categoryName'],
    idField:"categoryId"

  };
  filterValue!: string ;
  

  constructor(private matDialog: MatDialog,
              private categoryService: CategoryService,
              private apiService:ApiService) {}

  ngOnInit(){
    console.log(this.CatDataSource);
  }
 
  
  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    
    this.CatDataSource.filter = this.filterValue.trim().toLowerCase();
    console.log(this.CatDataSource);
  }

  openDialogCreate(): void{
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "CreateCategory",
      title: "Create category",
      actionButtonText: "Create",
      endpoint:this.category,
      hasCategory:false,
      hasDescription:false,
      hasImage:false,
      hasName:false,
      hasCategoryName:true,
      arrayData:['categoryName'],
      idField:"categoryId"
    }
  
    const dialogRef = this.matDialog.open(DialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
     
    }) 
  }
  
}

