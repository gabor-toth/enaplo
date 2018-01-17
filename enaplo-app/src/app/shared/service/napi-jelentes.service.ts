import { Injectable } from '@angular/core';

import { EnaploBaseService } from './enaplo-base.service';
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
	*/
	public getNapiJelentes( aktaId: string, naploId: string ): any {
		return this.httpGetApi( 'bejegyzes_adatok', {
			'id': '%23page_bejegyzesek',
			'aktaid': aktaId,
			'naploid': naploId,
		} ).toPromise();
	}
}
