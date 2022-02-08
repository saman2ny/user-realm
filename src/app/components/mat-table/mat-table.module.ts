import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { IconsModule } from 'src/app/icons/icons.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LoaderModule } from '../loader/loader.module';
import { ViewEndpointsModule } from 'src/app/main/service/view-endpoints/view-endpoints.module';

@NgModule({
  declarations: [
    MatTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    IconsModule,
    LoaderModule,
    ViewEndpointsModule

  ],
  exports: [
    MatTableComponent
  ]
})
export class MatTableModules { }
