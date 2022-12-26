import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveUserGuard } from './shared/guards/active-user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule),
    canActivate: [ActiveUserGuard]
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
    canActivate: [ActiveUserGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'stock' },
  { path: '', pathMatch: 'full', redirectTo: 'stock' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
