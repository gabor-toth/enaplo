import { BaseComponent } from '../common/component/base.component';
import { Naplo, Szerepkor } from '../shared/model/naplo-model';
import { NaploService, SzerepkorNaplok } from '../shared/service/naplo.service';
import { ValueListsService } from '../shared/service/value-lists.service';
import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-szerepkorok',
	templateUrl: './szerepkorok.component.html',
	styleUrls: [ './szerepkorok.component.css' ]
} )
export class SzerepkorokComponent extends BaseComponent implements OnInit {
	readonly nameOfMapClosedSzerepkorok = 'nameOfMapClosedSzerepkorok';
	mapOfClosedSzerepkorok = {};

	szerepkorNaplok: SzerepkorNaplok[];

	constructor( private enaploService: NaploService, private valueListsService: ValueListsService ) {
		super();
		this.loadSettings();
	}

	protected getComponentName(): string {
		return 'SzerepkorokComponent';
	}

	ngOnInit() {
		this.refreshNaplok( false );
	}

	private loadSettings(): void {
		this.mapOfClosedSzerepkorok = this.loadSettingsWithDefault( this.nameOfMapClosedSzerepkorok, {} );
	}

	toggleSzerepkor( naploId: number, opened: boolean ): void {
		this.setOrClearValueInSettingsMap( this.mapOfClosedSzerepkorok, naploId, opened ? undefined : true, this.nameOfMapClosedSzerepkorok );
	}

	refreshNaplok( forceReload: boolean ): void {
		const promiseNaplok = this.enaploService
			.getNaplokBySzerepkor( forceReload, this )
			.then( szerepkorNaplok => this.onEnaploLoaded( szerepkorNaplok, forceReload ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( szerepkorNaplok: SzerepkorNaplok[], forceReload: boolean ): void {
		this.szerepkorNaplok = szerepkorNaplok;
		if ( forceReload ) {
			this.showActionFeedback( 'Naplók frissítve' );
		}
	}

}
