import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';
import { StockComponent } from "./stock/stock.component";
import { SalesComponent } from "./sales/sales.component";
import { Sales2Component } from './sales2/sales2.component'
import { MoveDialogComponent } from './stock/move-dialog/move-dialog.component';
import { SoldDialogComponent } from './stock/sold-dialog/sold-dialog.component';
import { SplitProductComponent } from "./stock/split-product/split-product.component";
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { ImportComponent } from './import/import.component';
import { CustomerComponent } from './customer/customer.component';
import { FormComponent } from './customer/form/form.component';


@NgModule({
  declarations: [
    StockComponent,
    SalesComponent,
    MoveDialogComponent,
    SoldDialogComponent,
    SplitProductComponent,
    HeaderComponent,
    ImportComponent,
    CustomerComponent,
    FormComponent,
    Sales2Component
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule { }
