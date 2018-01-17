import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AllMaterialModule, LocalStorageService } from './common/export';
import { NaplokComponent, BeallitasokComponent, TeendokComponent, SzerepkorokComponent } from './components/export';
import { NaploService, NapiJelentesService, ValueListsService } from './shared/export';

@NgModule( {
	declarations: [
		AppComponent,
		NaplokComponent,
		BeallitasokComponent,
		TeendokComponent,
		SzerepkorokComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule, // https://angular.io/guide/reactive-forms
		AllMaterialModule,
		HttpModule,
		AppRoutingModule,
	],
	providers: [ NaploService, NapiJelentesService, ValueListsService, LocalStorageService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
