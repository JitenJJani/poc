import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserscrudComponent } from './containers/userscrud/userscrud.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:action', component: UserscrudComponent },
  { path: 'users/:action/:id', component: UserscrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
