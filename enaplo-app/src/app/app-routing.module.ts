import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaploComponent } from './naplo/naplo.component';

const routes: Routes = [
	{ path: '', redirectTo: '/naplok', pathMatch: 'full' },
	{ path: 'index.html', redirectTo: '/naplok', pathMatch: 'full' },
	{ path: 'naplok', component: NaploComponent },
	{ path: 'teendok', component: NaploComponent },
	{ path: 'beallitasok', component: NaploComponent },
	// { path: 'detail/:id', component: HeroDetailComponent },
	// { path: 'heroes',     component: HeroesComponent }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule { }
