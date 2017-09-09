import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NaploComponent } from './naplo/naplo.component';
import { NaploService } from './shared/service/naplo.service';

@NgModule( {
	declarations: [
		AppComponent,
		NaploComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		MaterialModule,
		MdButtonModule, MdCheckboxModule
	],
	providers: [ NaploService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
