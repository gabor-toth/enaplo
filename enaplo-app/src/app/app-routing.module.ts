import { BeallitasokComponent } from './beallitasok/beallitasok.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaplokComponent } from './naplok/naplok.component';
import { SzerepkorokComponent } from './szerepkorok/szerepkorok.component';
import { TeendokComponent } from './teendok/teendok.component';

const routes: Routes = [
	{ path: '', redirectTo: '/szerepkorok', pathMatch: 'full' },
	{ path: 'index.html', redirectTo: '/szerepkorok', pathMatch: 'full' },
	{ path: 'szerepkorok', component: SzerepkorokComponent },
	{ path: 'naplok', component: NaplokComponent },
	{ path: 'teendok', component: TeendokComponent },
	{ path: 'beallitasok', component: BeallitasokComponent },
	// { path: 'detail/:id', component: HeroDetailComponent },
	// { path: 'heroes',     component: HeroesComponent }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule { }
