import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppFinanceComponent } from './app-finance/app-finance.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app-dashboard', component: AppDashboardComponent },
  { path: 'app', component: AppFinanceComponent },
  { path: 'registrar', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
