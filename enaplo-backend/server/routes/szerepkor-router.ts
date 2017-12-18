import { Router, Request, Response, NextFunction } from 'express';
import { FonaploParser, NaploParser } from '../parsers/exports';
import { ApiResponse } from '../model/api-response';
import { BaseDataRouter } from './base-data-router';
import { BaseDataRouterHandler } from './base-data-router-handler';
import { BaseRouterHandler } from './base-router-handler';

class GetSzerepkorokHandler extends BaseDataRouterHandler {
	protected handle(): void {
		const data = this.datastore.getAllData();
		this.response.json( data );
	}
}

class GetSzerepkorHandler extends BaseDataRouterHandler {
	protected handle(): void {
		const id = this.request.params.id;
		if ( !this.checkParameter( 'id', id ) ) {
			return;
		}
		return this.datastore.findOne( { '_id': id }, ( error, document ) => {
			// TODO use https://www.npmjs.com/package/nedb-promise
			if ( error === null ) {
				this.response.json( document );
			} else {
				console.error( error.message );
				this.response.sendStatus( 404 );
			}
		} );
	}
}

class PutSzerepkorHandler extends BaseDataRouterHandler {
	protected handle(): void {
		const id = this.request.params.id;
		if ( !this.checkParameter( 'id', id ) ) {
			return;
		}
		const data = this.getParsedJsonBody();
		if ( data === undefined ) {
			return;
		}
		this.datastore.insert( { '_id': id, 'azonosito': id, 'nev': data.nev }, ( error, document ) => {
			if ( error === null ) {
				this.response.sendStatus( 200 );
			} else {
				console.error( error.message );
				this.response.sendStatus( 409 );
			}
		} );
	}
}

export class RouterSzerepkor extends BaseDataRouter {
	constructor() {
		super();
	}

	protected getTableName(): string {
		return 'szerepkorok';
	}

	register( router: Router ): void {
		router.get( '/api/szerepkodok', ( request: Request, response: Response, next: NextFunction ) =>
			new GetSzerepkorokHandler().handleDataRequest( this.datastore, request, response ) );

		router.get( '/api/szerepkodok/:id', ( request: Request, response: Response, next: NextFunction ) =>
			new GetSzerepkorHandler().handleDataRequest( this.datastore, request, response ) );

		router.put( '/api/szerepkodok/:id', ( request: Request, response: Response, next: NextFunction ) =>
			new PutSzerepkorHandler().handleDataRequest( this.datastore, request, response ) );
	}
}
