import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaploComponent } from './naplo/naplo.component';

const routes: Routes = [
	{ path: '', redirectTo: '/naplo', pathMatch: 'full' },
	{ path: 'index.html', redirectTo: '/naplo', pathMatch: 'full' },
	{ path: 'naplo', component: NaploComponent },
	// { path: 'detail/:id', component: HeroDetailComponent },
	// { path: 'heroes',     component: HeroesComponent }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule { }
