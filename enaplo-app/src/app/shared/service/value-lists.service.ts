import { LocalStorageService } from '../../common/service/local-storage.service';
import { Injectable, ValueProvider } from '@angular/core';
import { Response } from '@angular/http';

import { ValueItem } from '../model/export';
import { EnaploBaseService } from './enaplo-base.service';
import { ValueListParser } from './parsers/value-list-parser';

@Injectable()
export class ValueListsService extends EnaploBaseService {
	private cache = {};

	constructor( private localStorageService: LocalStorageService ) {
		super();
		this.loadFromCache();
	}

	private loadFromCache(): any {
		this.cache = this.localStorageService.getItemWithDefault( this.getComponentName(), null, {} );
	}

	protected getComponentName(): string {
		return 'ValueLists';
	}

	public clearAllCaches(): void {
		this.cache = {};
		this.localStorageService.setItem( this.getComponentName(), null, null );
	}

	public getSzerepkodokByNaplo( naploId: string, aktaId: string ): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'szerepkodokbynaplo', naploId, aktaId );
	}

	public getSzerepkodokByNaploAndApply( naploId: string, aktaId: string ): Promise<ValueItem[]> {
		const newSzerepkorokPromise = this.getSzerepkodokByNaplo( naploId, aktaId );
		const oldSzerepkorokPromise = this.getSzerepkodok();
		return Promise.all<ValueItem[], ValueItem[]>( [ newSzerepkorokPromise, oldSzerepkorokPromise ] ).then(( results: any[] ) => this.applyNewSzerepkorok( results[ 0 ], results[ 1 ] ) );
	}

	private applyNewSzerepkorok( newlyLoadedSzerepkodok: ValueItem[], oldSzerepkodok: ValueItem[] ): Promise<ValueItem[]> {
		oldSzerepkodok = Object.assign( [], oldSzerepkodok );
		for ( const newSzerepkod of newlyLoadedSzerepkodok ) {
			let found = false;
			for ( const oldSzerepkod of oldSzerepkodok ) {
				if ( newSzerepkod.azonosito == oldSzerepkod.azonosito ) {
					found = true;
					break;
				}
			}
			if ( !found ) {
				oldSzerepkodok.push( newSzerepkod );
			}
		}
		oldSzerepkodok.sort(( o1, o2 ) => o1.azonosito - o2.azonosito );
		this.addToCache( this.getCacheName( 'szerepkodok', null, null ), oldSzerepkodok );
		return Promise.resolve( oldSzerepkodok );
	}

	public getSzerepkodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromBackend( 'szerepkodok' );
	}

	public getSzakagKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'szakagkodok' );
	}

	public getNujnevjegyzekKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'nujnevjegyzek' );
	}

	public getSzeleroKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'szelerokodok' );
	}

	public getSzeliranyKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'szeliranykodok' );
	}

	public getEgkepKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'egkepkodok' );
	}

	public getCsapadekKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'csapadekkodok' );
	}

	public getSzakmaKodok(): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieveFromEnaplo( 'resztvevoszakma' );
	}

	private getCachedItemOrRetrieveFromEnaplo( cachedItemType: string, id1?: string, id2?: string ): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( cachedItemType, id1, id2, ( cacheName ) => this.retrieveFromEnaplo( cacheName, cachedItemType, id1, id2 ) );
	}

	private retrieveFromEnaplo( cacheName: string, cachedItemType: string, id1: string, id2: string ): Promise<ValueItem[]> {
		/*
		 * https://enaplo.e-epites.hu/enaplo_demo/ajax?q=&method=szerepkodokbynaplo&extradata=23167%2C20998%2Cd143fda6ea060067ef0678a6ce12498a&_=1509748317283
		 * https://enaplo.e-epites.hu/enaplo_demo/ajax?q=&method=resztvevoszakma&extradata=%2C%2Cd143fda6ea060067ef0678a6ce12498a&_=1509748317297
		 *	7|Egyéb
	 	 *  1|Építészet
		 */
		return this.httpGetApiWithoutHtmlId( `?q=&method=${ cachedItemType }&extradata=${ id1 }%2C${ id2 }%2C${ this.htmlId }` )
			.toPromise()
			.then( response => this.receivedResponse( response, cacheName ) )
			.catch( error => this.handleError( error, null ) );
	}

	private getCachedItemOrRetrieveFromBackend( cachedItemType: string ): Promise<ValueItem[]> {
		return this.getCachedItemOrRetrieve( cachedItemType, null, null, ( cacheName ) => this.retrieveFromBackend( cacheName, cachedItemType, null, null ) );
	}

	private retrieveFromBackend( cacheName: string, cachedItemType: string, id1: string, id2: string ): Promise<ValueItem[]> {
		return this.httpGetBackend( `/${ cachedItemType }` )
			.toPromise()
			.then( response => this.receivedJsonResponse( response, cacheName ) )
			.catch( error => this.handleError( error, null ) );
	}

	private getCachedItemOrRetrieve( cachedItemType: string, id1: string, id2: string, retriever: ( cacheName: string ) => Promise<ValueItem[]> ): Promise<ValueItem[]> {
		const cacheName = this.getCacheName( cachedItemType, id1, id2 );
		const cachedItems = this.cache[ cacheName ];
		if ( cachedItems !== undefined ) {
			return Promise.resolve( cachedItems );
		}
		return retriever( cacheName );
	}

	private getCacheName( cachedItemType: string, id1?: string, id2?: string ): string {
		id1 = this.fixId( id1 );
		id2 = this.fixId( id2 );
		return cachedItemType + '/' + id1 + '/' + id2;
	}

	private fixId( id: string ): string {
		return id == null || id == undefined ? '' : id;
	}

	private receivedResponse( response: Response, cacheName: string ): Promise<ValueItem[]> {
		const items = new ValueListParser().setData( response.text() ).parse();
		this.addToCache( cacheName, items );
		return Promise.resolve( items );
	}

	private receivedJsonResponse( response: Response, cacheName: string ): Promise<ValueItem[]> {
		const items = JSON.parse( response.text() );
		this.addToCache( cacheName, items );
		return Promise.resolve( items );
	}

	private addToCache( cacheName: string, items: ValueItem[] ): void {
		this.cache[ cacheName ] = items;
		this.localStorageService.setItem( this.getComponentName(), null, this.cache );
	}

}
