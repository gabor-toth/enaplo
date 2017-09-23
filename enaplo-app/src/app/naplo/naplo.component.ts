import { BaseComponent } from '../common/component/base.component';
import { Naplo } from '../shared/model/naplo-model';
import { NaploService } from '../shared/service/naplo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArrayDataSource } from '../common/helper';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './naplo.component.html',
	styleUrls: [ './naplo.component.css' ]
} )
export class NaploComponent extends BaseComponent implements OnInit {
	naplok: ArrayDataSource<Naplo>;
	displayedColumns = [ 'azonosito', 'nev', 'iranyitoszam', 'telepules'
		// , 'helyrajziszam', 'tulajdonos'
	];

	constructor( private enaploService: NaploService,
		private router: Router ) {
		super();

	}

	ngOnInit() {
		this.refreshNaplok( false );
	}

	refreshNaplok( forceReload: any ): void {
		this.enaploService
			.getNaplok( forceReload, this )
			.then( naplok => this.onEnaploLoaded( naplok ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( naplok: Naplo[] ): void {
		this.naplok = new ArrayDataSource( naplok );
	}



	/*
	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
	 */
}
