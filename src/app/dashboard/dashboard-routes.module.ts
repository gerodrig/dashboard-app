import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { authGuard } from '../services/auth.guard';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class DashboardRoutesModule { }
