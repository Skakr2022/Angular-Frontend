import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { CoreService } from 'src/app/services/core.service';
import { ProductService } from 'src/app/services/product.service';

import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent implements OnInit {
  empForm!: FormGroup;

  public categories: ProductCategory[] = [];
  userFile: any;
  message: string = "";
  imgURL: any = "";
  imagePath: any;
  // formControlNames = ['name', 'description', 'imageUrl', 'category.categoryName'];
  formControls: { [key: string]: any } = {};
  setFormValues: { [key: string]: any } = {};
  
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private apiService:ApiService,
        private productService :ProductService,
        private _fb: FormBuilder,
        private _coreService: CoreService,
        private _dialogRef: MatDialogRef<DialogComponent> ) {}
  
  ngOnInit(): void {
    this.listProductCategories();
   
    console.log(this.data.id);
    // this.empForm = this._fb.group({
    //   name: ['',Validators.minLength(4)],
    //   description: ['',Validators.minLength(4)],
    //   imageUrl: ['',Validators.required],
    //   category: ['',Validators.required]
    // });
    
    this.data.arrayData.forEach((controlName : string) => {
      if(controlName.includes('.')){
        const nestedProperties = controlName.split('.');
        this.formControls[nestedProperties[0]]=['', Validators.required];
      }else
         this.formControls[controlName] = ['', Validators.required];
    });

    this.empForm = this._fb.group(this.formControls);

    if(this.data.Data){
      // console.log(this.data);
      // this.empForm.setValue({
      //   name:this.data.Data.name,
      //   description:this.data.Data.description,
      //   imageUrl:this.data.Data.imageUrl,
      //   category:this.data.Data.category.categoryName
      // })
      
      this.data.arrayData.forEach((Name:string) =>{
        if(Name.includes('.')){
          const nestedProperties = Name.split('.');
          this.setFormValues[nestedProperties[0]]=this.data.Data[nestedProperties[0]][nestedProperties[1]]
        }
        this.setFormValues[Name]=this.data.Data[Name];
      }) 
      this.empForm.setValue(this.setFormValues);
    }
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        console.log(data)
        this.categories = data;
      }
    )
  }

  onSubmit(){
    if(this.empForm.valid){
      if (this.data.Data) {
        console.log(this.data.Data);
        const formData = new FormData();
        this.data.arrayData.forEach((Name:string) =>{
          if (Name.includes('.')){
            const nestedProperties = Name.split('.');
            formData.append(nestedProperties[0],this.empForm.value[nestedProperties[0]]);
          } else if(Name==="imageUrl"){
            formData.append(Name,this.userFile);
          } else{
             formData.append(Name,this.empForm.value[Name]);
          }
        }) 
        // formData.append("description",this.empForm.value.description)
        // formData.append("name",this.empForm.value.name) 
        // formData.append("category",this.empForm.value.category) 
        // formData.append("imageUrl",this.userFile)   
        this.apiService 
          .updatData(this.data.endpoint,this.data.id, formData)
          .subscribe({ 
            next: (val: any) => {
              this._coreService.openSnackBar('Product details updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        const formData = new FormData();
        console.log(this.empForm.value)
        // formData.append("description",this.empForm.value.description)
        // formData.append("name",this.empForm.value.name)
        // formData.append("category",this.empForm.value.category)
        // formData.append("imageUrl",this.userFile) 
        this.data.arrayData.forEach((Name:string) =>{
          if (Name.includes('.')){
            const nestedProperties = Name.split('.');
            formData.append(nestedProperties[0],this.empForm.value[nestedProperties[0]]);
          } else if(Name==="imageUrl"){
            formData.append(Name,this.userFile);
          } else{
            formData.append(Name,this.empForm.value[Name]);
          }
        }) 
        this.apiService.postData(this.data.endpoint,formData).subscribe(
          {
            next: (val: any) => {
              this._coreService.openSnackBar('Product successfully added!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          }
        );
      }
    }else {
      console.log("no valid data")
    }
}


    onSelectFile(event: Event) {
      console.log("file   ....")
      const e = (event.target as HTMLInputElement);
      if ( e.files!.length > 0 )
      {
        const file = e.files![0];
        this.userFile = file;
       // this.f['profile'].setValue(file);
   
      
   
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
  }
  

  // updateProduct(id:number,data:any){
  //   this.productService.updateProduct(id,data)
  // }
 
}



