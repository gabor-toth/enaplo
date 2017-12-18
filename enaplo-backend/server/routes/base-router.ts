import { ApiResponse } from '../model/api-response';
import { Router, Request, Response, NextFunction } from 'express';
import { BaseParser } from '../parsers/exports';
import config from '../config';

export class BaseRouter {
	private static urlBase: string;

	public static setUrlBase( urlBase: string ): void {
		BaseRouter.urlBase = urlBase;
	}

	protected proxy( response: Response, urlPart: string ): void {
		response.json( ApiResponse.proxy( config.targetUrlBase + urlPart ) );
	}

}
