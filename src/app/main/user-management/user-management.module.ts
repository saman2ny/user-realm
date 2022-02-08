import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModules } from 'src/app/components/mat-table/mat-table.module';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ErrorPageModule } from '../error-page/error-page.module';
import { ViewEndpointsModule } from '../service/view-endpoints/view-endpoints.module';

@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    ViewEndpointsModule,
    UserManagementRoutingModule,
    MatTableModules,
    ErrorPageModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserManagementModule { }
