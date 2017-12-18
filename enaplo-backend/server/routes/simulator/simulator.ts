import { Request, Response, Router, NextFunction } from 'express';
import { BaseRouter } from '../base-router';
import { BaseRouterHandler } from '../base-router-handler';
import * as root from 'app-root-path';
import * as path from 'path';

class SimulatorHandler extends BaseRouterHandler {
	private static RESPONSE_ROOT: string = path.join( root.path, 'server/routes/simulator/responses' );
	private splittedExtraData: string[];

	public handle(): void {
		const method = this.request.query.method;
		if ( !this.checkHtmlId() ) {
			return;
		}
		// 		if ( this.delayResponse == 0 ) {
		this.sendResponse( method );
		// 		} else {
		// 			const me = this;
		// 			setTimeout( function() { me.sendResponse( request, response, method ); },
		// 				this.delayResponse );
		// 		}
	}

	private sendResponse( method: string ): void {
		this.response.setHeader( 'Content-type', 'test/html; charset=utf-8' );
		switch ( method ) {
			case 'naplofa_load':
			case 'szakagkodok':
				this.sendItemWithoutId( method );
				break;
			case 'get_naplo_items':
				this.sendItemWithIdFromRequest( method, 'aktaid' );
				break;
			case 'szerepkodokbynaplo':
				this.sendItemWithIsdFromExtraData( method );
				break;
			case 'vallalkozoinaplokkarton_load':
			default:
				this.badRequest( 'Unknown method ' + method );
				break;
		}
	}

	private sendItemWithIdFromRequest( baseFileName: string, idParameter: string ) {
		const id = this.request.query[ idParameter ];
		if ( !this.checkParameter( idParameter, id ) ) {
			return;
		}
		this.sendItemWithId( baseFileName, id );
	}

	sendItemWithIsdFromExtraData( baseFileName: string ) {
		this.sendItemWithId( baseFileName, this.splittedExtraData[ 0 ] + '_' + this.splittedExtraData[ 1 ] );
	}

	sendItemWithId( baseFileName: string, id: string ) {
		this.response.sendFile( baseFileName + '_' + id, { 'root': SimulatorHandler.RESPONSE_ROOT } );
	}

	sendItemWithoutId( baseFileName: string ) {
		this.response.sendFile( baseFileName, { 'root': SimulatorHandler.RESPONSE_ROOT } );
	}

	checkHtmlId(): boolean {
		const extradata = this.request.query.extradata;
		let isHtmlIdValid: boolean;
		if ( extradata != null ) {
			isHtmlIdValid = this.checkHtmlIdInExtraData( extradata );
		} else {
			isHtmlIdValid = this.checkHtmlIdInRequest();
		}
		if ( !isHtmlIdValid ) {
			this.response.sendStatus( 403 ); // forbidden
		}
		return isHtmlIdValid;
	}

	checkHtmlIdInRequest(): boolean {
		const htmlId = this.request.query.htmlid;
		return this.isValidHtmlId( htmlId );
	}

	checkHtmlIdInExtraData( extraData: string ): boolean {
		const decodedExtraData = decodeURIComponent( extraData );
		this.splittedExtraData = decodedExtraData.split( ',' );
		return this.splittedExtraData.length == 3 && this.isValidHtmlId( this.splittedExtraData[ 2 ] );
	}

	isValidHtmlId( htmlId: string ): boolean {
		return htmlId === '_htmlid_';
	}
}

export class RouterSimulator extends BaseRouter {
	private delayResponse = 0;

	register( router: Router ) {
		router.get( '/enaplo_demo/ajax', ( request: Request, response: Response, next: NextFunction ) =>
			new SimulatorHandler().handleRequest( request, response ) );
	}
}

