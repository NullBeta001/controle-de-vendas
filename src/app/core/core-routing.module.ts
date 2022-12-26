import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';

const routes: Routes = [
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.module').then(m => m.StockModule),
    canActivate: [ActiveUserGuard]
  },
  {
    path: 'import',
    loadChildren: () => import('./import/import.module').then(m => m.ImportModule),
    canActivate: [ActiveUserGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [ActiveUserGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
    canActivate: [ActiveUserGuard]
  },
  {
    path: 'sales2',
    loadChildren: () => import('./sales2/sales2.module').then(m => m.Sales2Module),
    canActivate: [ActiveUserGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
