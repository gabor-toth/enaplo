import { Naplo } from '../model/naplo-model';
import { EnaploBaseService } from './enaplo-base.service';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { NaploParser } from './naplo-parser';

@Injectable()
export class NaploService extends EnaploBaseService {

	constructor() {
		super();
	}

	getAll(): Promise<Naplo[]> {
		return this.httpGet( '?method=naplofa_load&id=%23page_enaplok' )
			.toPromise()
			.then( response => new NaploParser().setData( response.text() ).parse() )
			.catch( this.handleError );
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
