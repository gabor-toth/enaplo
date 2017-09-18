import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { BaseParser } from '../base-parser';
import { BaseService } from '../../common/service/base.service';
import { ServiceCallStateObserver } from '../../common/service/service-call-state-callback';

export abstract class EnaploBaseService extends BaseService {
	protected getHeaders: Headers = new Headers( {} );
	protected apiUrl = 'https://enaplo.e-epites.hu/enaplo_demo';  // URL to web api

	constructor() {
		super();
		this.apiUrl = environment.enaploServiceUrl;
	}

	protected httpGet( urlPart: string, stateCallback: ServiceCallStateObserver ): Observable<Response> {
		const time = Date.now();
		return this.http
			.get( `${ this.apiUrl }${ urlPart }&htmlid=_htmlid_&_=${ time }`, this.getHeaders );
	}
}
