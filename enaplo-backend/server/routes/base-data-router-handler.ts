import { ApiResponse } from '../model/api-response';
import { BaseParser } from '../parsers/exports';
import { BaseRouterHandler } from './base-router-handler';
import { Request, Response } from 'express';

export abstract class BaseDataRouterHandler extends BaseRouterHandler {
	protected datastore: Nedb;

	public handleDataRequest( datastore: Nedb, request: Request, response: Response ): void {
		this.datastore = datastore;
		super.handleRequest( request, response );
	}

	public handleRequest( request: Request, response: Response ): void {
		throw new Error( 'Illegal access: call handleDataRequest instead.' );
	}
}
