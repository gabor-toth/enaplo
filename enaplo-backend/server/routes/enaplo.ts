import { Router, Request, Response, NextFunction } from 'express';
import { BaseRouter } from './base-router';

export class RouterEnaplo extends BaseRouter {
  register( router: Router ) {
    router.get( '/api/enaplo/:id', ( request: Request, response: Response, next: NextFunction ) => {
      const id = request.params.id;

      if ( !this.checkParameter( response, "id", id ) ) {
        return;
      }

      switch ( id ) {
        case '23129':
          response.json(
            [
              { id: '23129|20963', azonosito: '2017/1347/4-1', name: 'blabla', roles: [ 'Építtető' ] },
              { id: '23129|20964', x: '2017/1347/4-2', name: 'alap', roles: [ 'Építtető', 'Kivitelező - napijelentésért felelős', 'Kivitelező - napijelentésre jogosult' ] }
            ] );
          break;
        case '23130':
        //break;
        default:
          this.noSuchElement( response, 'No enaplo with id ' + id );
          break;
      }
    } );

    router.post( '/api/enaplo/:id', ( request: Request, response: Response, next: NextFunction ) => {
      const id = request.params.id;

      if ( !this.checkParameter( response, "id", id ) ) {
        return;
      }

      response.json(
        [
          { id: '23129|20963', x: '2017/1347/4-1', name: 'blabla', roles: [ 'Építtető' ] },
          { id: '23129|20964', x: '2017/1347/4-2', name: 'alap', roles: [ 'Építtető', 'Kivitelező - napijelentésért felelős', 'Kivitelező - napijelentésre jogosult' ] }
        ] );
    } );
  }
}
