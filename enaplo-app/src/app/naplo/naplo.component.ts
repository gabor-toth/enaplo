import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from '../common/component/base.component';
import { Naplo } from '../shared/model/naplo-model';
import { NaploService } from '../shared/service/naplo.service';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './naplo.component.html',
	styleUrls: [ './naplo.component.css' ]
} )
export class NaploComponent extends BaseComponent implements OnInit {
	localStorageNameMapOfClosedNaplos = 'NaploComponent' + '.' + 'mapOfClosedNaplos';

	naplok: Naplo[];
	displayedColumns = [ 'azonosito', 'nev', 'iranyitoszam', 'telepules'
		// , 'helyrajziszam', 'tulajdonos'
	];
	mapOfClosedNaplos = {};

	constructor( private enaploService: NaploService, private router: Router ) {
		super();
		const map = JSON.parse( localStorage.getItem( this.getLocalStorageName( this.localStorageNameMapOfClosedNaplos ) ) );
		if ( map !== null ) {
			this.mapOfClosedNaplos = map;
		}
	}

	ngOnInit() {
		this.refreshNaplok( false );
	}

	toggleNaplo( naploId: number, opened: boolean ): void {
		if ( opened ) {
			delete this.mapOfClosedNaplos[ naploId ];
		} else {
			this.mapOfClosedNaplos[ naploId ] = true;
		}
		localStorage.setItem( this.getLocalStorageName( this.localStorageNameMapOfClosedNaplos ), JSON.stringify( this.mapOfClosedNaplos ) );
	}

	refreshNaplok( forceReload: any ): void {
		this.enaploService
			.getNaplok( forceReload, this )
			.then( naplok => this.onEnaploLoaded( naplok ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( naplok: Naplo[] ): void {
		this.naplok = naplok;
	}

	onClickSettings( event: any, naploSorszam: string ): void {
		// see https://stackoverflow.com/questions/35274028/stop-event-propagation-in-angular-2
		event.stopPropagation();
		console.log( 'clicked ' + naploSorszam );
	}

	/*
	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
	 */
}
