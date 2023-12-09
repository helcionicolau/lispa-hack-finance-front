import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppFinanceComponent } from './app-finance/app-finance.component';

const routes: Routes = [
  { path: 'app', component: AppFinanceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }