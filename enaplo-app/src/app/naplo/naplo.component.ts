import { Naplo } from './naplo';
import { NaploService } from '../shared/service/naplo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './naplo.component.html',
	styleUrls: [ './naplo.component.css' ]
} )
export class NaploComponent implements OnInit {
	naplok: Naplo[];

	constructor( private enaploService: NaploService,
		private router: Router ) {
		console.log( 'NaploComponent constructor' );
	}

	ngOnInit() {
		console.log( 'NaploComponent ngOnInit' );
		this.getEnaplo();
	}

	getEnaplo(): void {
		this.enaploService
			.getAll()
			.then( naplok => this.onEnaploLoaded( naplok ) );
	}

	onEnaploLoaded( naplok: Naplo[] ): void {
		console.log( 'NaploComponent onEnaploLoaded' );
		this.naplok = naplok;
		console.log( naplok );
	}

	/*
	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
	 */
}
