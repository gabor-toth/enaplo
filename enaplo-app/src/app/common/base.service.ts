import { ServiceLocator } from './service-locator';
import { Http, Headers, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export abstract class BaseService {
	protected getHeaders: Headers = new Headers( {} );
	protected postHeaders: Headers = new Headers( { 'Content-Type': 'application/json' } );
	// protected apiUrl = 'http://localhost:3000/api/enaplok';  // URL to web api
	protected apiUrl = 'https://enaplo.e-epites.hu/enaplo_demo';  // URL to web api
	protected http: Http;

	private htmlId: string;

	constructor() {
		this.htmlId = '6fb2424dc1c342b9ad7451a0353693c4';
		this.http = ServiceLocator.injector.get( Http );
	}

	protected httpGet( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&htmlid=_htmlid_&_=${ time }`, this.getHeaders );
		// .get( `${ this.apiUrl }${ urlPart }` );
	}
}
