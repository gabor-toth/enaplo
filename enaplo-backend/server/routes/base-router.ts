import { ApiResponse } from '../model/api-response';
import { Router, Request, Response, NextFunction } from 'express';
import { BaseParser } from '../parsers/exports';
import config from '../config';

export class BaseRouter {
	private static urlBase: string;

	public static setUrlBase( urlBase: string ): void {
		BaseRouter.urlBase = urlBase;
	}

	protected checkParameter( response: Response, parameterName: string, parameterValue: any ): boolean {
		if ( parameterValue === undefined ) {
			this.badRequest( response, 'Missing parameter ' + parameterName );
			return false;
		}
		return true;
	}

	protected badRequest( response: Response, message: string ): void {
		response
			.status( 400 )
			.send( message );
	}

	protected noSuchElement( response: Response, message: string ): void {
		response
			.status( 404 )
			.send( message );
	}

	protected proxy( response: Response, urlPart: string ): void {
		response.json( ApiResponse.proxy( config.targetUrlBase + urlPart ) );
	}

	protected parseBody( request: Request, response: Response, parser: BaseParser ): void {
		const data = request.body;
		if ( !this.checkParameter( response, 'body', data ) ) {
			return;
		}

		const parsedData = parser.setData( data ).parse();
		response.json( ApiResponse.data( parsedData ) );
	}
}
