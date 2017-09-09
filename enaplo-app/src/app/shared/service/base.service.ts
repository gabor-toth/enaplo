import { environment } from '../../../environments/environment';
import { ServiceLocator } from '../../common/service-locator';
import { Http, Headers, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export abstract class BaseService {
	protected getHeaders: Headers = new Headers( {} );
	protected apiUrl = 'https://enaplo.e-epites.hu/enaplo_demo';  // URL to web api
	protected http: Http;

	constructor() {
		this.http = ServiceLocator.injector.get( Http );
		this.apiUrl = environment.enaploServiceUrl;
	}

	protected httpGet( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&htmlid=_htmlid_&_=${ time }`, this.getHeaders );
	}
}
