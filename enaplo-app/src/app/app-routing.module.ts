import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnaploComponent } from './enaplo/enaplo.component';

const routes: Routes = [
  { path: '', redirectTo: '/enaplo', pathMatch: 'full' },
  { path: 'enaplo',  component: EnaploComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
