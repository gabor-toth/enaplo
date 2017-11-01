import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AllMaterialModule } from './common/module/material.module';
import { NaploComponent } from './naplo/naplo.component';
import { NaploService } from './shared/service/naplo.service';

@NgModule( {
	declarations: [
		AppComponent,
		NaploComponent
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
	providers: [ NaploService ],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
