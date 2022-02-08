import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


import { UserModificationsComponent } from './user-modifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModificationsRoutingModule } from './user-modifications-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ViewEndpointsModule } from '../service/view-endpoints/view-endpoints.module';
import { IconsModule } from 'src/app/icons/icons.module';



@NgModule({
  declarations: [
    UserModificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    ViewEndpointsModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    IconsModule,
    NgxMaskModule.forRoot(),
    UserModificationsRoutingModule
  ],
  exports: [
    UserModificationsComponent
  ]
})
export class UserModificationsModule { }
