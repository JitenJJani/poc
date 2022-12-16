import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiserviceService } from 'src/services/apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './common/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserscrudComponent } from './containers/userscrud/userscrud.component';
import { LoaderComponent } from './common/loader/loader.component';
import { ContactNumberPipe } from 'src/pipes/contact.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    SearchComponent,
    UserscrudComponent,
    LoaderComponent,
    ContactNumberPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
