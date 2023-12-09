import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AppFinanceComponent } from './app-finance/app-finance.component';
import { EmprestimoService } from './services/emprestimo.service';
import { HttpClientModule } from '@angular/common/http';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AppFinanceComponent,
    AppDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    EmprestimoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
