import { ServiceCallStateObserver } from '../../common/service/service-call-state-callback';
import { Naplo } from '../model/naplo-model';
import { EnaploBaseService } from './enaplo-base.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { NaploParser } from './naplo-parser';

@Injectable()
export class NaploService extends EnaploBaseService {
	cachedNaplo: Naplo[];

	constructor() {
		super();
	}

	getAll( reload: boolean, stateObserver: ServiceCallStateObserver ): Promise<Naplo[]> {
		if ( !reload && this.cachedNaplo != null ) {
			return new Promise(( resolve, reject ) => resolve( this.cachedNaplo ) );
		}
		this.cachedNaplo = null;
		stateObserver.onServiceCallStart();
		return this.httpGet( '?method=naplofa_load&id=%23page_enaplok', stateObserver )
			.toPromise()
			.then( response => this.receivedResponse( response, stateObserver ) )
			.catch( error => this.handleError( error, stateObserver ) );
	}

	private receivedResponse( response: Response, stateObserver: ServiceCallStateObserver ): Naplo[] {
		stateObserver.onServiceCallEnd();
		this.cachedNaplo = new NaploParser().setData( response.text() ).parse();
		return this.cachedNaplo;
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
