import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from '../common/component/base.component';
import { Naplo } from '../shared/model/naplo-model';
import { NaploService } from '../shared/service/naplo.service';

@Component( {
	selector: 'app-enaplo',
	templateUrl: './naplok.component.html',
	styleUrls: [ './naplok.component.css' ]
} )
export class NaplokComponent extends BaseComponent implements OnInit {
	readonly nameOfMapClosedNaplok = 'mapOfClosedNaplok';
	readonly nameOfMapOfHiddenNaplok = 'mapOfHiddenNaplok';

	naplok: Naplo[];
	displayedColumns = [ 'azonosito', 'nev', 'iranyitoszam', 'telepules'
		// , 'helyrajziszam', 'tulajdonos'
	];
	mapOfClosedNaplos = {};
	mapOfHiddenNaplos = {};

	constructor( private enaploService: NaploService ) {
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
		this.mapOfClosedNaplos = this.loadSettingsWithDefault( this.nameOfMapClosedNaplok, {} );
		this.mapOfHiddenNaplos = this.loadSettingsWithDefault( this.nameOfMapOfHiddenNaplok, {} );
	}

	toggleNaplo( naploId: number, opened: boolean ): void {
		this.setOrClearValueInSettingsMap( this.mapOfClosedNaplos, naploId, opened ? undefined : true, this.nameOfMapClosedNaplok );
	}

	refreshNaplok( forceReload: boolean ): void {
		this.enaploService
			.getNaplok( forceReload, this )
			.then( naplok => this.onEnaploLoaded( naplok, forceReload ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( naplok: Naplo[], forceReload: boolean ): void {
		this.naplok = naplok;
		if ( forceReload ) {
			this.showActionFeedback( 'Naplók frissítve' );
		}
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
