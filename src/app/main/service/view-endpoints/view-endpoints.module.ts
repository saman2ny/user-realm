import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEndpointsComponent } from './view-endpoints.component';
import { SharedModule } from '../../../shared/shared.module';
import { IconsModule } from '../../../icons/icons.module';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    ViewEndpointsComponent
  ],
  exports: [
    ViewEndpointsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IconsModule,
    ClipboardModule,
  ]
})
export class ViewEndpointsModule { }
