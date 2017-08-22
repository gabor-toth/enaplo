import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Api } from '../api/api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EnaploComponent } from './enaplo/enaplo.component';
import { EnaploService } from './enaplo/enaplo.service';

@NgModule( {
  declarations: [
    AppComponent,
    EnaploComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ EnaploService ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
