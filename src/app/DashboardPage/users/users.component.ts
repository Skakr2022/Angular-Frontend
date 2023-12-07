import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../common/Product';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { CustomersService } from 'src/app/services/Customers.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoreService } from 'src/app/services/core.service';
import { TableColumn } from '../../components/table/TableColumn';
import { Auth } from 'src/app/Authentification/signup/Auth.model';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from 'src/app/common/Users.model';
import { RoleService } from 'src/app/services/Role.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {
  users:Users[]=[];
  displayedColumns: string[] = ['id','fullName','email','Role','action'];
  dataSource=new MatTableDataSource(this.users);
  isValid: Boolean = this.dataSource && this.dataSource.data.length > 0;
  filterValue : String ='';
  products!:Product[];
  test:string="";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  UsersNum=0;
  
  constructor(public productService: ProductService,
              private matDialog: MatDialog,
              private  roleService:RoleService,
              private _liveAnnouncer: LiveAnnouncer,
              private _coreService: CoreService,
              private customersService:CustomersService) { }

   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
      this.listCustomers(); 
      console.log(this.listCustomers()) ;
      this.findUsersPage();  
      this.roleService.getRole().subscribe((data)=>{
        console.log(data);
      })
  }
  
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
      this.paginator.page
      .subscribe(()=>{
        this.dataSource = new MatTableDataSource(this.findUsersPage() as any) ;
      });
      this.sort.sortChange.pipe(
      ).subscribe(
        ()=>{
        this.dataSource = new MatTableDataSource(this.findUsersPage() as any) 
      }
      );
  }

  isTrue(): Boolean{
    // return this.dataSource && this.dataSource.data.length>0;
    return true;
  }
  
  listCustomers(){
     this.customersService.getCustomers().subscribe(
       data=>{
        console.log(data);
        // this.dataSource=new MatTableDataSource(data);
        this.UsersNum=data.length;
       }
     )
  }
  findUsersPage(){
    this.customersService
    .findUsers(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 5,
      this.sort?.active ?? "id",
      this.sort?.direction ?? "asc"
    ).subscribe((data)=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data.content);
      console.log(this.dataSource)
    })
  }
  
  applyFilter(event: KeyboardEvent) {
    
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }
 

  // openDialogEdit(data:Product): void{
  //   console.log(data);
  //   const dialogConfig = new MatDialogConfig();
  //   // The user can't close the dialog by clicking outside its body
  //   dialogConfig.disableClose = true;
  
  //   dialogConfig.width = "500px";
  //   dialogConfig.data = {
  //     name: "EditProduct",
  //     title: "Update Product",
  //     actionButtonText: "Edit",
  //     product: data
  //   }
  //   const dialogRef = this.matDialog.open(DialogEditComponent,dialogConfig);
  //   dialogRef.afterClosed().subscribe( result => {this.listCustomers();} )
  // }


  
}
