import { BaseComponent } from '../common/component/base.component';
import { Naplo } from '../shared/model/naplo-model';
import { NaploService } from '../shared/service/naplo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './naplo.component.html',
	styleUrls: [ './naplo.component.css' ]
} )
export class NaploComponent extends BaseComponent implements OnInit {
	naplok: Naplo[];

	constructor( private enaploService: NaploService,
		private router: Router ) {
		super();
	}

	ngOnInit() {
		this.getEnaplo();
	}

	getEnaplo(): void {
		this.enaploService
			.getAll( this )
			.then( naplok => this.onEnaploLoaded( naplok ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( naplok: Naplo[] ): void {
		this.naplok = naplok;
	}



	/*
	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
	 */
}
