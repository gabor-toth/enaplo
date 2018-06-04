import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BaseService } from '../../common/service/base.service';
import { BaseParser } from '../base-parser';

export abstract class EnaploBaseService extends BaseService {
	protected readonly apiUrl;
	protected readonly backendUrl;
	protected htmlId = '_htmlid_';

	constructor() {
		super();
		this.apiUrl = environment.enaploServiceUrl;
		this.backendUrl = environment.backendServiceUrl;
	}

	protected httpGetApi( method: string, parameters: { [ key: string ]: any } ): Observable<Response> {
		let request = '?method=' + method;
		for ( const key of Object.keys( parameters ) ) {
			request += '&' + key + '=' + parameters[ key ];
		}
		return this.httpGetApiUrl( request );
	}

	protected httpGetApiUrl( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&htmlid=${ this.htmlId }&_=${ time }`, { headers: this.getHeaders } );
	}

	protected httpGetApiWithoutHtmlId( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&_=${ time }`, { headers: this.getHeaders } );
	}

	protected httpGetBackend( urlPart: string ): Observable<Response> {
		return this.http
			.get( `${ this.backendUrl }${ urlPart }`, { headers: this.getHeaders } );
	}

	protected dateToString( date: Date ): string {
		return date == null ? '' : date.toISOString().slice( 0, 10 ).replace( /-/g, '.' ) + '.';
	}
}
