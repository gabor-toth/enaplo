import { Router, Request, Response, NextFunction } from 'express';

export class BaseRouter {

  protected checkParameter( response: Response, paraeterName: string, paraeterValue: any ): boolean {
    if ( paraeterValue === undefined ) {
      response
        .status( 400 )
        .send( 'No id given' );
      return false;
    }
    return true;
  }

  protected noSuchElement( response: Response, message: string ): void {
    response
      .status( 404 )
      .send( message );
  }
}