import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NaploComponent } from './naplo/naplo.component';
import { NaploService } from './naplo/naplo.service';

@NgModule( {
	declarations: [
		AppComponent,
		NaploComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [ NaploService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
