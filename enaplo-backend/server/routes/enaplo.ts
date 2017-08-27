import * as express from 'express';

export class RouterEnaplo {
  register( router: express.Router ) {
    router.get( '/api/enaplo/:id', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      const id = request.params.id;

      if ( id === undefined ) {
        response
          .status( 400 )
          .send( 'No id given' );
      } else {
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
            response
              .status( 404 )
              .send( 'No enaplo with id ' + id );
            break;
        }
      }
    });
    router.post( '/api/enaplo/:id', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      console.log( request.params );
      const id = request.params.id;

      if ( id === undefined ) {
        response
          .status( 400 )
          .send( 'No id given' );
      } else {
        response.json(
          [
            { id: '23129|20963', x: '2017/1347/4-1', name: 'blabla', roles: [ 'Építtető' ] },
            { id: '23129|20964', x: '2017/1347/4-2', name: 'alap', roles: [ 'Építtető', 'Kivitelező - napijelentésért felelős', 'Kivitelező - napijelentésre jogosult' ] }
          ] );
      }
    });
  }
}
