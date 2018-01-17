import { Response } from '@angular/http';

import { NaploService, NapiJelentesService } from '../export';
import { Naplo } from '../model/export';
import { FonaploParser } from './parsers/fonaplo-parser';

export class NapiJelentesFetcher {
	private napiJelentesService: NapiJelentesService;
	private naplok: Naplo[];
	private currentIndex: number;

	constructor( napiJelentesService: NapiJelentesService, naplok: Naplo[] ) {
		this.napiJelentesService = napiJelentesService;
		this.naplok = naplok;
		this.currentIndex = 0;
	}

	process(): Promise<Naplo[]> {
		if ( this.currentIndex == this.naplok.length ) {
			return this.receivedLastResponse();
		} else {
			return this.fetchNext();
		}
	}

	private fetchNext(): Promise<Naplo[]> {
		const naploSorszam = this.naplok[ this.currentIndex ].sorszam;
		return this.NapiJelentesService.getFonaplok( naploSorszam ).then( response => this.receivedResponse( response ) );
	}

	private receivedResponse( response: Response ): Promise<Naplo[]> {
		const fonaplok = new FonaploParser().setData( response.text() ).parse();
		this.naplok[ this.currentIndex ].setNaplok( fonaplok );
		this.currentIndex++;
		return this.process();
	}

	private receivedLastResponse(): Promise<Naplo[]> {
		this.NapiJelentesService.cachedNaplok = this.naplok;
		return Promise.resolve( this.naplok );
	}

}

