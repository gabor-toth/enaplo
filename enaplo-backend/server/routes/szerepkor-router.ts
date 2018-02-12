import { Router, Request, Response, NextFunction } from 'express';
import { FonaploParser, NaploParser } from '../parsers/exports';
import { ApiResponse } from '../model/api-response';
import { BaseDataRouter } from './base-data-router';
import { BaseDataRouterHandler } from './base-data-router-handler';
import { BaseRouterHandler } from './base-router-handler';

class SzerepkorHandler extends BaseDataRouterHandler<SzerepkorHandler> {
	public getAll(): void {
		super.getAll();
	}

	public get(): void {
		const id = this.request.params.id;
		super.getById( id );
	}

	public put(): void {
		const id = this.request.params.id;
		const data = this.getParsedJsonBody();
		if ( data === undefined ) {
			return;
		}
		super.putById( id, { 'azonosito': id, 'nev': data.nev } );
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
			new SzerepkorHandler().startDataRequest( this.datastore, request, response ).getAll() );

		router.get( '/api/szerepkodok/:id', ( request: Request, response: Response, next: NextFunction ) =>
			new SzerepkorHandler().startDataRequest( this.datastore, request, response ).get() );

		router.put( '/api/szerepkodok/:id', ( request: Request, response: Response, next: NextFunction ) =>
			new SzerepkorHandler().startDataRequest( this.datastore, request, response ).put() );
	}
}
