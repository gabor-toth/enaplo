import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from './base-router';
import { FonaploParser, NaploParser } from '../parsers/exports';
import { ApiResponse } from '../model/api-response';

export class RouterEnaplo extends BaseRouter {
	register( router: Router ) {
		router.get( '/api/enaplok', ( request: Request, response: Response, next: NextFunction ) => {
			this.proxy( response, '/ajax?method=naplofa_load&id=%23page_enaplok&htmlid=${htmlid}&_=${time}' );
		} );

		router.post( '/api/enaplok', ( request: Request, response: Response, next: NextFunction ) => {
			this.parseBody( request, response, new NaploParser() );
		} );

		router.get( '/api/enaplo/:id', ( request: Request, response: Response, next: NextFunction ) => {
			const id = request.params.id;
			if ( !this.checkParameter( response, 'id', id ) ) {
				return;
			}
			this.proxy( response, '/ajax?method=get_naplo_items&parentid=enaploAktaFa&aktaid=${naplosorszam}&htmlid=${htmlid}&_=${time}' );
		} );

		router.post( '/api/enaplo/:id', ( request: Request, response: Response, next: NextFunction ) => {
			this.parseBody( request, response, new FonaploParser() );
		} );
	}
}
