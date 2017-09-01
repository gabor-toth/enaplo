import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from './base-router';
import { EnaplokParser } from '../parsers/enaplok-parser';
import { ApiResponse } from '../model/api-response';

export class RouterEnaplok extends BaseRouter {
  register( router: Router ) {
    router.get( '/api/enaplok', ( request: Request, response: Response, next: NextFunction ) => {
      response.json( ApiResponse.proxy( "http://localhost:3000/enaplo_demo/ajax?method=enaplok_adatok&id=%23page_enaplok&htmlid=${htmlid}&_=${time}" ) );
    } );

    router.post( '/api/enaplok', ( request: Request, response: Response, next: NextFunction ) => {
      const data = request.body;
      if ( !this.checkParameter( response, "body", data ) ) {
        return;
      }

      const parsedData = new EnaplokParser().setData( data ).parse();
      response.json( ApiResponse.data( parsedData ) );
    } );
  }
}
