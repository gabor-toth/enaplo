import { ApiResponse } from '../model/api-response';
import { BaseParser } from '../parsers/exports';
import { Request, Response } from 'express';

export abstract class BaseRouterHandler {
	protected response: Response;
	protected request: Request;

	protected abstract handle(): void;

	public handleRequest( request: Request, response: Response ): void {
		this.startRequest( request, response );
		this.handle();
	}

	public startRequest( request: Request, response: Response ): void {
		this.request = request;
		this.response = response;
	}

	protected checkParameter( parameterName: string, parameterValue: any ): boolean {
		if ( parameterValue === undefined ) {
			this.badRequest( 'Missing parameter ' + parameterName );
			return false;
		}
		return true;
	}

	protected badRequest( message: string ): void {
		this.response
			.status( 400 )
			.send( message );
	}

	protected noSuchElement( message: string ): void {
		this.response
			.status( 404 )
			.send( message );
	}

	protected parseBodyAndSendAsResponse( request: Request, response: Response, parser: BaseParser ): void {
		const data = request.body;
		if ( !this.checkParameter( 'body', data ) ) {
			return;
		}

		const parsedData = parser.setData( data ).parse();
		response.json( ApiResponse.data( parsedData ) );
	}

	protected getParsedJsonBody(): any {
		const data = this.request.body;
		if ( !this.checkParameter( 'body', data ) ) {
			return undefined;
		}

		const parsedData = JSON.parse( data );
		return parsedData;
	}
}
