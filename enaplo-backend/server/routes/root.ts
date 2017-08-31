import { Router, Request, Response, NextFunction } from 'express';

export class RouterRoot {
  register( router: Router ) {
    router.get( '/', ( request: Request, response: Response, next: NextFunction ) => {
      response.render( 'index', {
        title: 'E-Napló'
      } );
    } );
  }
}
