import { Enaplo } from './enaplo';
import { EnaploService } from './enaplo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './enaplo.component.html',
	styleUrls: [ './enaplo.component.css' ]
} )
export class EnaploComponent implements OnInit {
	enaplok: Enaplo[];

	constructor( private enaploService: EnaploService,
		private router: Router ) { }

	ngOnInit() {
		this.getEnaplo();
	}

	getEnaplo(): void {
		this.enaploService
			.getAll()
			.then( enaplok => this.enaplok = enaplok );
	}

	/*
	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
	 */
}
