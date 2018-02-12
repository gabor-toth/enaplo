import { BaseDataRouter } from '../base-data-router';
import { Request, Response, Router, NextFunction } from 'express';
import { BaseRouterHandler } from '../base-router-handler';
import { NapiJelentesHandler } from './napi-jelentes-router';
import * as root from 'app-root-path';
import * as path from 'path';

class SimulatorHandler extends BaseRouterHandler {
	private static RESPONSE_ROOT: string = path.join( root.path, 'server/routes/simulator/responses' );
	private napiJelentesDatastore: Nedb;
	private splittedExtraData: string[];

	constructor() {
		super();
		this.napiJelentesDatastore = BaseDataRouter.getDatastore( 'napi_jelentes' );
	}

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
				this.sendItemWithIdsFromRequest( method, [ 'aktaid' ] );
				break;
			case 'szerepkodokbynaplo':
				this.sendItemWithIsdFromExtraData( method );
				break;
			case 'bejegyzes_karton_load':
				// new NapiJelentesHandler().startDataRequest( this.napiJelentesDatastore, this.request, this.response ).get();
				this.sendItemWithIdsFromRequest( method, [ 'aktaid', 'naploid' ] );
				break;
			case 'vallalkozoinaplokkarton_load':
			default:
				this.badRequest( 'Unknown method ' + method );
				break;
		}
	}

	private sendItemWithIdsFromRequest( baseFileName: string, idParameters: string[] ) {
		const ids = [];
		for ( const idParameter of idParameters ) {
			const id = this.request.query[ idParameter ];
			if ( !this.checkParameter( idParameter, id ) ) {
				return;
			}
			ids.push( id );
		}
		this.sendItemWithIds( baseFileName, ids );
	}

	sendItemWithIsdFromExtraData( baseFileName: string ) {
		this.sendItemWithIds( baseFileName, [ this.splittedExtraData[ 0 ], this.splittedExtraData[ 1 ] ] );
	}

	sendItemWithIds( baseFileName: string, ids: string[] ) {
		let fileName = baseFileName;
		for ( const id of ids ) {
			fileName += '_' + id;
		}
		this.response.sendFile( fileName, { 'root': SimulatorHandler.RESPONSE_ROOT } );
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

export class RouterSimulator {
	private delayResponse = 0;

	register( router: Router ) {
		router.get( '/enaplo_demo/ajax', ( request: Request, response: Response, next: NextFunction ) =>
			new SimulatorHandler().handleRequest( request, response ) );
	}
}

