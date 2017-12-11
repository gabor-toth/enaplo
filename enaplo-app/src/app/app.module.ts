import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AllMaterialModule } from './common/module/material.module';
import { LocalStorageService } from './common/service/local-storage.service';
import { NaplokComponent } from './naplok/naplok.component';
import { NaploService } from './shared/service/naplo.service';
import { ValueListsService } from './shared/service/value-lists.service';
import { BeallitasokComponent } from './beallitasok/beallitasok.component';
import { TeendokComponent } from './teendok/teendok.component';
import { SzerepkorokComponent } from './szerepkorok/szerepkorok.component';

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
	providers: [ NaploService, ValueListsService, LocalStorageService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
