import { Request, Response, Router, NextFunction } from 'express';
import { BaseRouter } from '../base-router';
import * as root from 'app-root-path';
import * as path from 'path';

export class RouterSimulator extends BaseRouter {
	private delayResponse = 100;
	private responseRoot: string = path.join( root.path, 'server/routes/simulator/responses' );

	register( router: Router ) {
		router.get( '/enaplo_demo/ajax', ( request: Request, response: Response, next: NextFunction ) => {
			const htmlid = request.query.htmlid;
			const method = request.query.method;
			if ( !this.checkHtmlId( response, htmlid ) ) {
				return;
			}
			if ( this.delayResponse == 0 ) {
				this.sendResponse( request, response, method );
			} else {
				const me = this;
				setTimeout( function() { me.sendResponse( request, response, method ); },
					this.delayResponse );
			}
		} );
	}

	private sendResponse( request: Request, response: Response, method: string ): void {
		response.setHeader( 'Content-type', 'test/html; charset=utf-8' );
		switch ( method ) {
			case 'naplofa_load':
				response.sendFile( 'naplofa_load', { 'root': this.responseRoot } );
				break;
			case 'get_naplo_items':
				this.sendItemWithId( request, response, method, 'aktaid' );
				break;
			case 'vallalkozoinaplokkarton_load':
			default:
				this.badRequest( response, 'Unknown method ' + method );
				break;
		}
	}

	sendItemWithId( request: Request, response: Response, baseFileName: string, idParameter: string ) {
		const id = request.query[ idParameter ];
		if ( !this.checkParameter( response, idParameter, id ) ) {
			return;
		}
		response.sendFile( baseFileName + '_' + id, { 'root': this.responseRoot } );
	}

	checkHtmlId( response: Response, htmlid: string ): boolean {
		if ( htmlid != '_htmlid_' ) {
			response.sendStatus( 403 ); // forbidden
			return false;
		}
		return true;
	}
}
