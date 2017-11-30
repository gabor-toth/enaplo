import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ServiceCallStateObserver } from '../../common/service/service-call-state-callback';

import { Naplo } from '../model/naplo-model';
import { EnaploBaseService } from './enaplo-base.service';
import { FonaploParser } from './parsers/fonaplo-parser';
import { NaploParser } from './parsers/naplo-parser';

class FonaploFetcher {
	service: NaploService;
	stateObserver: ServiceCallStateObserver;
	naplok: Naplo[];
	position: number;

	constructor( service: NaploService, stateObserver: ServiceCallStateObserver, naplok: Naplo[] ) {
		this.service = service;
		this.stateObserver = stateObserver;
		this.naplok = naplok;
		this.position = 0;
	}

	fetchNext(): any {
		if ( this.position == this.naplok.length ) {
			this.stateObserver.onServiceCallEnd();
			this.service.cachedNaplok = this.naplok;
			return this.naplok;
		}
		this.stateObserver.onServiceCallProgress( 100 * ( this.position + 1 ) / ( this.naplok.length + 1 ) );
		const naploSorszam = this.naplok[ this.position ].sorszam;
		return this.service.getFonaplok( naploSorszam ).then( response => this.receivedResponse( response ) );
	}

	private receivedResponse( response: Response ): any {
		const fonaplok = new FonaploParser().setData( response.text() ).parse();
		this.naplok[ this.position ].fonaplok = fonaplok;
		this.position++;
		return this.fetchNext();
	}

}

@Injectable()
export class NaploService extends EnaploBaseService {
	cachedNaplok: Naplo[];

	constructor() {
		super();
	}

	getNaplok( reload: boolean, stateObserver: ServiceCallStateObserver ): Promise<Naplo[]> {
		if ( !reload && this.cachedNaplok != null ) {
			return new Promise(( resolve, reject ) => resolve( this.cachedNaplok ) );
		}
		this.cachedNaplok = null;
		stateObserver.onServiceCallStart();
		return this.httpGetApi( '?method=naplofa_load&id=%23page_enaplok' )
			.toPromise()
			.then( response => this.receivedResponse( response, stateObserver ) )
			.catch( error => this.handleError( error, stateObserver ) );
	}

	private receivedResponse( response: Response, stateObserver: ServiceCallStateObserver ): any {
		const naplok = new NaploParser().setData( response.text() ).parse();
		return new FonaploFetcher( this, stateObserver, naplok ).fetchNext();
	}

	getFonaplok( naploId: string ): Promise<Response> {
		return this.httpGetApi( '?method=get_naplo_items&parentid=enaploAktaFa&aktaid=' + naploId ).toPromise();
	}

	/*
	get( id: number ): Promise<Naplo> {
		const url = `${ this.apiUrl }/${ id }`;
		return this.http.get( url )
			.toPromise()
			.then( response => response.json().data as Naplo )
			.catch( this.handleError );
	}

	delete( id: number ): Promise<void> {
		const url = `${ this.apiUrl }/${ id }`;
		return this.http.delete( url, { headers: this.headers } )
			.toPromise()
			.then(() => null )
			.catch( this.handleError );
	}

	create( name: string ): Promise<Naplo> {
		return this.http
			.post( this.apiUrl, JSON.stringify( { name: name } ), { headers: this.headers } )
			.toPromise()
			.then( res => res.json().data as Naplo )
			.catch( this.handleError );
	}

	update( entity: Naplo ): Promise<Naplo> {
		const url = `${ this.apiUrl }/${ entity.id }`;
		return this.http
			.put( url, JSON.stringify( entity ), { headers: this.headers } )
			.toPromise()
			.then(() => entity )
			.catch( this.handleError );
	}
	*/
}
