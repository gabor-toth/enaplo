import { Response } from '@angular/http';

import { ServiceCallStateObserver } from '../../common/export';
import { NaploService } from '../export';
import { Naplo } from '../model/export';
import { FonaploParser } from './parsers/fonaplo-parser';

export class FonaploFetcher {
	private naploService: NaploService;
	private stateObserverCallback: ServiceCallStateObserver;
	private naplok: Naplo[];
	private currentNaploIndex: number;

	constructor( service: NaploService, stateObserver: ServiceCallStateObserver, naplok: Naplo[] ) {
		this.naploService = service;
		this.stateObserverCallback = stateObserver;
		this.naplok = naplok;
		this.currentNaploIndex = 0;
	}

	process(): Promise<Naplo[]> {
		if ( this.currentNaploIndex == this.naplok.length ) {
			return this.receivedLastResponse();
		} else {
			return this.fetchNext();
		}
	}

	private fetchNext(): Promise<Naplo[]> {
		this.stateObserverCallback.onServiceCallProgress( 100 * ( this.currentNaploIndex + 1 ) / ( this.naplok.length + 1 ) );
		const naploSorszam = this.naplok[ this.currentNaploIndex ].sorszam;
		return this.naploService.getFonaplok( naploSorszam ).then( response => this.receivedResponse( response ) );
	}

	private receivedResponse( response: Response ): Promise<Naplo[]> {
		const fonaplok = new FonaploParser().setData( response.text() ).parse();
		this.naplok[ this.currentNaploIndex ].setNaplok( fonaplok );
		this.currentNaploIndex++;
		return this.process();
	}

	private receivedLastResponse(): Promise<Naplo[]> {
		this.stateObserverCallback.onServiceCallEnd();
		this.naploService.cachedNaplok = this.naplok;
		return Promise.resolve( this.naplok );
	}

}

