import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ValueItem } from '../model/value-item';
import { EnaploBaseService } from './enaplo-base.service';
import { ValueListParser } from './parsers/value-list-parser';

@Injectable()
export class ValueListsService extends EnaploBaseService {
	private cache = {};

	constructor() {
		super();
	}

	public getSzerepkodokByNaplo( naploId: string, aktaId: string ): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'szerepkodokbynaplo', naploId, aktaId );
	}

	public getSzakagKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'szakagkodok' );
	}

	public getNujnevjegyzekKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'nujnevjegyzek' );
	}

	public getSzeleroKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'szelerokodok' );
	}

	public getSzeliranyKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'szeliranykodok' );
	}

	public getEgkepKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'egkepkodok' );
	}

	public getCsapadekKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'csapadekkodok' );
	}

	public getSzakmaKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( 'resztvevoszakma' );
	}

	private getCachedItemOrRetrieve( cachedItemType: string, id1?: string, id2?: string ): Promise<ValueItem[]> {
		id1 = this.fixId( id1 );
		id2 = this.fixId( id2 );
		const cacheName = cachedItemType + '/' + id1 + '/' + id2;
		const cachedItems = this.cache[ cacheName ];
		if ( cachedItems !== undefined ) {
			return cachedItems;
		}
		/*
		 * https://enaplo.e-epites.hu/enaplo_demo/ajax?q=&method=szerepkodokbynaplo&extradata=23167%2C20998%2Cd143fda6ea060067ef0678a6ce12498a&_=1509748317283
		 * https://enaplo.e-epites.hu/enaplo_demo/ajax?q=&method=resztvevoszakma&extradata=%2C%2Cd143fda6ea060067ef0678a6ce12498a&_=1509748317297
		 *	7|Egyéb
	 	 *  1|Építészet
		 */
		return this.httpGetWithoutHtmlId( `?q=&method=${ cachedItemType }&extradata=${ id1 }%2C${ id2 }%2C${ this.htmlId }` )
			.toPromise()
			.then( response => this.receivedResponse( response, cacheName ) )
			.catch( error => this.handleError( error, null ) );
	}

	private fixId( id: string ): string {
		return id == null || id == undefined ? '' : id;
	}

	private receivedResponse( response: Response, cacheName: string ): ValueItem[] {
		const items = new ValueListParser().setData( response.text() ).parse();
		this.cache[ cacheName ] = items;
		return items;
	}

}
