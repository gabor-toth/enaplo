import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../common/component/base.component';
import { DisplayListItemUtil, DisplayListDragHandler, DisplayListDragParent, DisplayListItemData } from '../common/component/display.list.item';

import { Naplo, Szerepkor } from '../shared/model/naplo-model';
import { NaploService, SzerepkorNaplok } from '../shared/service/naplo.service';
import { ValueListsService } from '../shared/service/value-lists.service';


@Component( {
	selector: 'app-szerepkorok',
	templateUrl: './szerepkorok.component.html',
	styleUrls: [ './szerepkorok.component.css' ]
} )
export class SzerepkorokComponent extends BaseComponent implements OnInit, DisplayListDragParent<SzerepkorNaplok> {
	readonly nameOfMapSzerepkorok = 'mapSzerepkorok';
	readonly nameOfSelectedType = 'selectedType';
	mapOfSzerepkorok = {};

	dragHandler: DisplayListDragHandler<SzerepkorNaplok>;
	selectedType: string;
	private orderSzerepkor: {};

	szerepkorNaplok: SzerepkorNaplok[];

	constructor( private enaploService: NaploService, private valueListsService: ValueListsService ) {
		super();
		this.loadSettings();
		this.dragHandler = new DisplayListDragHandler<SzerepkorNaplok>( this );
	}

	protected getComponentName(): string {
		return 'SzerepkorokComponent';
	}

	ngOnInit() {
		this.refreshNaplok( false );
	}

	private loadSettings(): void {
		this.mapOfSzerepkorok = this.loadSettingsWithDefault( this.nameOfMapSzerepkorok, {} );
		this.selectedType = this.loadSettingsWithDefault( this.nameOfSelectedType, 'active' );
	}

	private saveSettings(): void {
		this.setSetting( this.nameOfMapSzerepkorok, this.mapOfSzerepkorok );
		this.setSetting( this.nameOfSelectedType, this.selectedType );
	}

	toggleSzerepkor( naploId: number, opened: boolean ): void {
		DisplayListItemUtil.setClosed( this.mapOfSzerepkorok, naploId, !opened );
		this.saveSettings();
	}

	selectionTypeChanged( selectedType: string ): void {
		this.selectedType = selectedType;
		this.saveSettings();
	}

	refreshNaplok( forceReload: boolean ): void {
		const promiseNaplok = this.enaploService
			.getNaplokBySzerepkor( forceReload, this )
			.then( szerepkorNaplok => this.onEnaploLoaded( szerepkorNaplok, forceReload ) )
			.catch( error => this.onServiceError( error ) );
	}

	onEnaploLoaded( szerepkorNaplok: SzerepkorNaplok[], forceReload: boolean ): void {
		szerepkorNaplok = DisplayListItemUtil.orderList( szerepkorNaplok, this.mapOfSzerepkorok );
		this.szerepkorNaplok = szerepkorNaplok;
		if ( forceReload ) {
			this.showActionFeedback( 'Naplók frissítve' );
		}
	}

	getMapOfDisplayItemData(): { [ key: number ]: DisplayListItemData } {
		return this.mapOfSzerepkorok;
	}

	getDisplayList(): SzerepkorNaplok[] {
		return this.szerepkorNaplok;
	}

	setDisplayList( newList: SzerepkorNaplok[] ) {
		this.szerepkorNaplok = newList;
		this.saveSettings();
	}
}
