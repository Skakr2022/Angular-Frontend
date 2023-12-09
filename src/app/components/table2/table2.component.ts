import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/apiService';
import { dialogData } from './dialog-data';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { Category } from 'src/app/common/Category.model';
import { CoreService } from 'src/app/services/core.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/Product';
import { SortingDataAccessorService } from 'src/app/services/sorting-data-accessor.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})

export class Table2Component implements OnInit, AfterViewInit {
  isEmpty=true;
  @Input() hasAction!:boolean;
  @Input() displayedColumns!: string[];
  @Input() dataSource!:MatTableDataSource<any>;
  @Input() endpoint!:string;
  @Input() sortActive!:string;
  @Input() Items!:string[];
  @Input() dialogData!:dialogData;
  @Input() Dialog!:any;
  @Input() filterValue!:string;
  @Input() idField!: string;
  @ViewChild(MatSort)sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @Output() loadDataEmitter: EventEmitter<() => void> = new EventEmitter<() => void>();
  products:Product[]=[];
  categNum:number=0;
  Button:string='more_horiz';
  date!:Date;
  constructor(private datePipe: DatePipe,
              private matDialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private apiService: ApiService,
              private _coreService: CoreService,
              private productService:ProductService,
              private sortingService:SortingDataAccessorService,
               ) { }

  ngOnInit(): void {
      this.listData();
      this.loadData();
      console.log(this.dataSource);
      this.dataSource.sortingDataAccessor=this.sortingService.sortingDataAccessor;
  }

  ngAfterViewInit(): void {
    this.paginator.page
    .subscribe(()=>{
      this.dataSource = new MatTableDataSource(this.loadData() as any) ;
    });

    this.sort.sortChange
    .subscribe(
      ()=>{
      this.dataSource = new MatTableDataSource(this.loadData() as any) 
    }
    ); 
  }
  
  getValueForColumn(element: any, column: string): any {
    // Handle nested properties
    if (column.includes('.')) {
      const nestedProperties = column.split('.');
      let nestedValue = element;
      for (const prop of nestedProperties) {
        nestedValue = nestedValue[prop];
      }
       return this.formatValue(nestedValue);
    } else{
       return this.formatValue(element[column]);
    }
  }
  
  formatValue(value: any): any {
    if (typeof value === 'number' && value.toString().length >= 13) {
      // Format date using Angular's date pipe
      return this.datePipe.transform(value, 'yyyy/MM/dd');
    } else {
      return value;
    }
  }
  
  openDialogEdit(data:any):void {
    console.log(data[this.idField]);
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: this.dialogData.name,
      title: this.dialogData.title,
      actionButtonText: this.dialogData.actionButtonText,
      Data: data,
      id:data[this.idField],
      endpoint:this.endpoint,
      hasName:this.dialogData.hasName,
      hasDescription:this.dialogData.hasDescription,
      hasImage:this.dialogData.hasImage,
      hasCategory:this.dialogData.hasCategory,
      hasCategoryName:this.dialogData.hasCategoryName,
      arrayData:this.dialogData.arrayData,
      idField:this.idField
    }

    const dialogRef = this.matDialog.open(this.Dialog,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {this.loadData();} )
  }

  deleteData(data: any){
    console.log(data);
    this.apiService.deleteData(this.endpoint,data[this.idField]).subscribe(
      data => {
        console.log(data);
        this.loadData();
        this._coreService.openSnackBar('data with id :  has deleted')
      }
    )
  }

  loadData():void{
    this.apiService
    .listPageableSortableData(
      this.endpoint,
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 5,
      this.sort?.active ?? this.sortActive,
      this.sort?.direction ?? "asc")
      .subscribe((data)=>{
        console.log(data);
      //  this.dataSource=new MatTableDataSource(data.content);
      this.dataSource.data = data.content ;
      });
  }

  listData(){
    this.apiService
    .getData(this.endpoint).subscribe(data=> {
      this.categNum=data.length;
      if(data.length==0)
        this.isEmpty=false;
    })
  }

  // isStringOrNumber(value: any): boolean {
  //   return typeof value === 'string' || typeof value === 'number';
  // }

  isImageTextColumn(column: string): boolean {
    // Add logic to identify columns where both image and text should be displayed
    return  column === 'name' ;
  }
 
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getimage(){
    this.products.forEach(product =>{
    this.productService.getphoto(product.productId).subscribe(
      (data: ArrayBuffer)=>{
          const byteArray = new Uint8Array(data);
          const blob = new Blob([byteArray], { type: 'image/png' }); // Change the MIME type accordingly
          product.imageUrl = URL.createObjectURL(blob);
          console.log("test" + product.imageUrl)
        
      }
    )
  })
  }
}

