import { Router, Request, Response, NextFunction } from 'express';
import { FonaploParser, NaploParser } from '../parsers/exports';
import { ApiResponse } from '../model/api-response';
import { BaseDataRouter } from './base-data-router';

export class RouterSzerepkor extends BaseDataRouter {
	constructor() {
		super();
	}

	protected getTableName(): string {
		return 'szerepkorok';
	}

	register( router: Router ): void {
		router.get( '/api/szerepkorok', ( request: Request, response: Response, next: NextFunction ) => {
			const data = this.datastore.getAllData();
			response.json( data );
		} );

		router.get( '/api/szerepkorok/:id', ( request: Request, response: Response, next: NextFunction ) => {
			const id = request.params.id;
			if ( !this.checkParameter( response, 'id', id ) ) {
				return;
			}
			return this.datastore.findOne( { '_id': id }, ( error, document ) => {
				// TODO use https://www.npmjs.com/package/nedb-promise
				if ( error === null ) {
					response.json( document );
				} else {
					console.error( error.message );
					response.sendStatus( 404 );
				}
			} );
		} );

		router.put( '/api/szerepkorok/:id', ( request: Request, response: Response, next: NextFunction ) => {
			const id = request.params.id;
			if ( !this.checkParameter( response, 'id', id ) ) {
				return;
			}
			const data = this.getParsedJsonBody( request, response );
			if ( data === undefined ) {
				return;
			}
			this.datastore.insert( { '_id': id, 'azonosito': id, 'nev': data.nev }, ( error, document ) => {
				if ( error === null ) {
					response.sendStatus( 200 );
				} else {
					console.error( error.message );
					response.sendStatus( 409 );
				}
			} );
		} );
	}
}
