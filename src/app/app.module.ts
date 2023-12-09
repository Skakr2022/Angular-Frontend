import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTableModule } from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { DataPropertyGetterPipe } from './components/table/data-property-getter.pipe/data-property-getter.pipe';

import { AppComponent } from './app.component';
import { BodyComponent } from './DashboardPage/body/body.component';
import { SidenavComponent } from './DashboardPage/sidenav/sidenav.component';
import { DashboardComponent } from './DashboardPage/dashboard/dashboard.component'; 
import { ProductsComponent } from './DashboardPage/products/products.component'; 
import { ProductsCategoriesComponent } from './DashboardPage/products-categories/products-categories.component'; 
import { CoupensComponent } from './DashboardPage/coupens/coupens.component'; 
import { MediaComponent } from './DashboardPage/media/media.component';
import { SettingsComponent } from './DashboardPage/settings/settings.component';
import { HeaderComponent } from './DashboardPage/header/header.component';
import { ChatBoxComponent } from './DashboardPage/chat-box/chat-box.component';
import { AdminProfileComponent } from './DashboardPage/admin-profile/admin-profile.component';
import { DashboardPageComponent } from './DashboardPage/DashboardPage.component';
import { LoginComponent } from './Authentification/login/login.component';
import { SignupComponent } from './Authentification/signup/signup.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { UsersComponent } from './DashboardPage/users/users.component';

import { AuthValidatorsService } from './Authentification/auth-validators.service';
import { AuthGuardService } from './Authentification/auth-guard.service';
import { AuthGuard2Service } from './Authentification/auth-guard2.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';






import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { CustomersService } from './services/Customers.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SortingDataAccessorService } from './services/sorting-data-accessor.service';
import { AuthInterceptor, httpInterceptorProviders } from './Authentification/helper/auth.interceptor';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { EventBusService } from './Authentification/shared/event-bus.service';
import { Table2Component } from './components/table2/table2.component';
import { ApiService } from './services/apiService';
import { MatMenuModule} from '@angular/material/menu';
import { DateFormatPipe } from './components/table2/date-format.pipe';
import { DialogComponent } from './components/dialog/dialog.component';





@NgModule({
  declarations: [
    DateFormatPipe,
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsCategoriesComponent,
    CoupensComponent,
    MediaComponent,
    SettingsComponent,
    HeaderComponent,
    ChatBoxComponent,
    AdminProfileComponent,
    LoginComponent,
    DashboardPageComponent,
    SignupComponent,
    ProductsComponent,
    InputComponent,
    ButtonComponent,
    TableComponent,
    DataPropertyGetterPipe,
    UsersComponent,
    Table2Component,
    DialogComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkMenuModule,
    OverlayModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSnackBarModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    
    
  ],
  
  providers: [AuthValidatorsService,
              AuthGuardService,
              AuthGuard2Service,
              CustomersService,
              SortingDataAccessorService,
              httpInterceptorProviders,
              TokenStorageService,
              ApiService,
              DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
