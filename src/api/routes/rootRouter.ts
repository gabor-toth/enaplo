import { Router, Request, Response, NextFunction } from 'express';

export class RootRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public hello( req: Request, res: Response, next: NextFunction ) {
    res.json( {
      message: 'Hello World!'
    } );
  }

  init(): void {
    this.router.get( '/', this.hello );
  }
}
