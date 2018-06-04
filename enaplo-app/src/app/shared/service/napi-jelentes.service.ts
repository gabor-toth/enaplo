import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { EnaploBaseService } from './enaplo-base.service';
import { NaploParser } from './parsers/naplo-parser';
import { ValueListsService } from './value-lists.service';

@Injectable()
export class NapiJelentesService extends EnaploBaseService {
	// cachedNaplok: Naplo[];

	constructor( private valueListsService: ValueListsService ) {
		super();
	}

	/*
	 * https://enaplo.e-epites.hu/enaplo_demo/ajax?method=letszam_load&szakma=&datum=2017.11.03.&aktaid=23167&naploid=20998&htmlid=d143fda6ea060067ef0678a6ce12498a&_=1509748317296
	 */

	/*
	* https://enaplo.e-epites.hu/enaplo_demo/ajax?method=bejegyzes_adatok&id=%23page_bejegyzesek&aktaid=23167&naploid=20999&htmlid=753c3cfd2fad8b5522c4aff798932f17&_=1504382847424
	* https://enaplo.e-epites.hu/enaplo_demo/ajax?method=bejegyzes_karton_load&datum=2018.02.11.&aktaid=23167&naploid=21157&htmlid=821055694774a43547ffdaf9528cfd13&_=1518468890198
	*/
	public getNapiJelentes( datum: Date, aktaId: string, naploId: string ): Promise<any> {
		return this.httpGetApi( 'bejegyzes_karton_load', {
			'datum': this.dateToString( datum ),
			'aktaid': aktaId,
			'naploid': naploId,
		} )
			.toPromise()
			.then( response => this.receivedResponse( response ) )
			.catch( error => this.handleError( error, null ) );
	}

	protected receivedResponse( response: Response ): Promise<any> {
		const naploSkeletons = new NaploParser().setData( response.text() ).parse();
		// return new FonaploFetcher( this, stateObserver, naploSkeletons ).process();
		return null;
	}
}
