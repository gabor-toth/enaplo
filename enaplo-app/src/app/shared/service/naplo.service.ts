import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceCallStateObserver } from '../../common/service/service-call-state-callback';

import { Naplo, Szerepkor, NaploBase } from '../model/naplo-model';
import { ValueItem } from '../model/value-item';
import { EnaploBaseService } from './enaplo-base.service';
import { FonaploParser } from './parsers/fonaplo-parser';
import { NaploParser } from './parsers/naplo-parser';
import { ValueListsService } from './value-lists.service';

class FonaploFetcher {
	private naploService: NaploService;
	private stateObserverCallback: ServiceCallStateObserver;
	private naplok: Naplo[];
	private currentNaploIndex: number;

	constructor( service: NaploService, stateObserver: ServiceCallStateObserver, naplok: Naplo[] ) {
		this.naploService = service;
		this.stateObserverCallback = stateObserver;
		this.naplok = naplok;
		this.currentNaploIndex = 0;
	}

	process(): Promise<Naplo[]> {
		if ( this.currentNaploIndex == this.naplok.length ) {
			return this.receivedLastResponse();
		} else {
			return this.fetchNext();
		}
	}

	private fetchNext(): Promise<Naplo[]> {
		this.stateObserverCallback.onServiceCallProgress( 100 * ( this.currentNaploIndex + 1 ) / ( this.naplok.length + 1 ) );
		const naploSorszam = this.naplok[ this.currentNaploIndex ].sorszam;
		return this.naploService.getFonaplok( naploSorszam ).then( response => this.receivedResponse( response ) );
	}

	private receivedResponse( response: Response ): Promise<Naplo[]> {
		const fonaplok = new FonaploParser().setData( response.text() ).parse();
		this.naplok[ this.currentNaploIndex ].naplok = fonaplok;
		this.currentNaploIndex++;
		return this.process();
	}

	private receivedLastResponse(): Promise<Naplo[]> {
		this.stateObserverCallback.onServiceCallEnd();
		this.naploService.cachedNaplok = this.naplok;
		return Promise.resolve( this.naplok );
	}

}

export class SzerepkorNaplok {
	public azonosito: number;
	public nev: string;
	public naplok: NaploBase[];

	constructor( valueItem: ValueItem ) {
		this.azonosito = valueItem.azonosito;
		this.nev = valueItem.nev;
		this.naplok = [];
	}
}

@Injectable()
export class NaploService extends EnaploBaseService {
	cachedNaplok: Naplo[];
	private cachedNaplokBySzerepkor: SzerepkorNaplok[];

	constructor( private valueListsService: ValueListsService ) {
		super();
	}

	private checkReload( reload: boolean ): void {
		if ( reload ) {
			this.cachedNaplok = null;
			this.cachedNaplokBySzerepkor = null;
		}
	}

	public getNaplok( reload: boolean, stateObserver: ServiceCallStateObserver ): Promise<Naplo[]> {
		this.checkReload( reload );
		if ( this.cachedNaplok != null ) {
			return Promise.resolve( this.cachedNaplok );
		}
		stateObserver.onServiceCallStart();
		return this.httpGetApi( '?method=naplofa_load&id=%23page_enaplok' )
			.toPromise()
			.then( response => this.receivedResponse( response, stateObserver ) )
			.catch( error => this.handleError( error, stateObserver ) );
	}

	public getNaplokBySzerepkor( reload: boolean, stateObserver: ServiceCallStateObserver ): Promise<SzerepkorNaplok[]> {
		this.checkReload( reload );
		if ( this.cachedNaplokBySzerepkor != null ) {
			return Promise.resolve( this.cachedNaplokBySzerepkor );
		}
		return this.getNaplok( false, stateObserver ).then( naplok => this.loadSzerepkorok() );
	}

	private loadSzerepkorok(): Promise<SzerepkorNaplok[]> {
		return this.valueListsService.getSzerepkodok()
			.then( szerepkodok => this.loadedSzerepkorok( szerepkodok ) )
			.then( szerepkodok => this.gotAllSzerepkorok( szerepkodok ) );
	}

	private loadedSzerepkorok( szerepkodok: ValueItem[] ): Promise<ValueItem[]> {
		const checkResult = this.checkSzerepkorok( this.cachedNaplok, szerepkodok );
		if ( checkResult != null ) {
			return checkResult;
		}
		return Promise.resolve( szerepkodok );
	}

	private checkSzerepkorok( naplok: NaploBase[], szerepkodok: ValueItem[] ): Promise<ValueItem[]> {
		for ( const naplo of naplok ) {
			let wasMissingSzerepkod = false;
			for ( const szerepkor of naplo.szerepkorok ) {
				if ( szerepkor.azonosito !== undefined ) {
					continue;
				}
				if ( !this.findAndFillSzerepkorId( szerepkor, szerepkodok ) ) {
					wasMissingSzerepkod = true;
				}
			}
			if ( wasMissingSzerepkod ) {
				// TODO avoid endless loop
				return this.valueListsService.getSzerepkodokByNaploAndApply( naplo.azonosito, naplo.sorszam ).then( newSzerepkodok => this.loadedSzerepkorok( newSzerepkodok ) );
			}
			if ( naplo.naplok.length != 0 ) {
				const checkResult = this.checkSzerepkorok( naplo.naplok, szerepkodok );
				if ( checkResult != null ) {
					return checkResult;
				}
			}
		}
		return null;
	}

	private gotAllSzerepkorok( szerepkodok: ValueItem[] ): Promise<SzerepkorNaplok[]> {
		const szerepkorok = [];
		for ( const szerepkod of szerepkodok ) {
			const szerepkorNaplok = new SzerepkorNaplok( szerepkod );
			szerepkorok.push( szerepkorNaplok );
			const szerepkodAzonosito = String( szerepkod.azonosito );
			this.checkRoleAndAdd( this.cachedNaplok, szerepkodAzonosito, szerepkorNaplok );
		}
		return Promise.resolve( szerepkorok );
	}

	private checkRoleAndAdd( naplok: NaploBase[], szerepkodAzonosito: string, szerepkorNaplok: SzerepkorNaplok ): void {
		for ( const naplo of naplok ) {
			for ( const naploSzerepkor of naplo.szerepkorok ) {
				if ( naploSzerepkor.azonosito == szerepkodAzonosito ) {
					szerepkorNaplok.naplok.push( naplo );
				}
			}
			if ( naplo.naplok.length != 0 ) {
				this.checkRoleAndAdd( naplo.naplok, szerepkodAzonosito, szerepkorNaplok );
			}
		}
	}

	private findAndFillSzerepkorId( szerepkor: Szerepkor, szerepkodok: ValueItem[] ): boolean {
		let found = false;
		for ( const szerepkod of szerepkodok ) {
			if ( szerepkod.nev == szerepkor.nev ) {
				szerepkor.id = szerepkor.azonosito = String( szerepkod.azonosito );
				found = true;
				break;
			}
		}
		return found;
	}

	private receivedResponse( response: Response, stateObserver: ServiceCallStateObserver ): Promise<Naplo[]> {
		const naplok = new NaploParser().setData( response.text() ).parse();
		return new FonaploFetcher( this, stateObserver, naplok ).process();
	}

	getFonaplok( naploId: string ): Promise<Response> {
		return this.httpGetApi( '?method=get_naplo_items&parentid=enaploAktaFa&aktaid=' + naploId ).toPromise();
	}
}
