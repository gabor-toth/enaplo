import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { BaseService } from '../../common/service/base.service';
import { BaseParser } from '../base-parser';

export abstract class EnaploBaseService extends BaseService {
	protected readonly apiUrl;
	protected htmlId: '_htmlid_';

	constructor() {
		super();
		this.apiUrl = environment.enaploServiceUrl;
	}

	protected httpGet( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&htmlid=${ this.htmlId }&_=${ time }`, { headers: this.getHeaders } );
	}

	protected httpGetWithoutHtmlId( urlPart: string ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&&_=${ time }`, { headers: this.getHeaders } );
	}
}
