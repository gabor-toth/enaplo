import { ApiResponse } from '../model/api-response';
import { BaseParser } from '../parsers/exports';
import { BaseRouterHandler } from './base-router-handler';
import { Request, Response } from 'express';

export class BaseDataRouterHandler<T extends BaseDataRouterHandler<T>> extends BaseRouterHandler {
	protected datastore: Nedb;

	public startDataRequest( datastore: Nedb, request: Request, response: Response ): T {
		this.datastore = datastore;
		super.startRequest( request, response );
		return <T><any>this;
	}

	public handleDataRequest( datastore: Nedb, request: Request, response: Response ): void {
		this.datastore = datastore;
		super.handleRequest( request, response );
	}

	protected handle(): void {
		throw new Error( 'Method not implemented.' );
	}

	public handleRequest( request: Request, response: Response ): void {
		throw new Error( 'Illegal access: call handleDataRequest instead.' );
	}

	protected getAll(): void {
		const data = this.datastore.getAllData();
		this.response.json( data );
	}

	protected getById( id: string ): void {
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

	protected putById( id: string, data: any ): void {
		if ( !this.checkParameter( 'id', id ) ) {
			return;
		}
		data[ '_id' ] = id;
		this.datastore.insert( data, ( error, document ) => {
			if ( error === null ) {
				this.response.sendStatus( 200 );
			} else {
				console.error( error.message );
				this.response.sendStatus( 409 );
			}
		} );
	}

}
