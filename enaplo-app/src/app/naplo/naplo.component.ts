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
	readonly nameOfMapClosedNaplos = 'mapOfClosedNaplos';
	readonly nameOfMapOfHiddenNaplos = 'mapOfHiddenNaplos';

	naplok: Naplo[];
	displayedColumns = [ 'azonosito', 'nev', 'iranyitoszam', 'telepules'
		// , 'helyrajziszam', 'tulajdonos'
	];
	mapOfClosedNaplos = {};
	mapOfHiddenNaplos = {};

	constructor( private enaploService: NaploService, private router: Router ) {
		super();
		this.loadSettings();
	}

	ngOnInit() {
		this.refreshNaplok( false );
	}

	protected getComponentName(): string {
		return 'NaploComponent';
	}

	private loadSettings(): void {
		this.mapOfClosedNaplos = this.loadSettingsWithDefault( this.nameOfMapClosedNaplos, {} );
		this.mapOfHiddenNaplos = this.loadSettingsWithDefault( this.nameOfMapOfHiddenNaplos, {} );
	}

	toggleNaplo( naploId: number, opened: boolean ): void {
		this.setOrClearValueInSettingsMap( this.mapOfClosedNaplos, naploId, opened ? undefined : true, this.nameOfMapClosedNaplos );
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
