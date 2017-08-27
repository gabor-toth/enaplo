import * as express from 'express';

export class RouterRoot {
  register( router: express.Router ) {
    router.get( '/', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      response.render( 'index', {
        title: 'E-Napló'
      });
    });
  }
}
