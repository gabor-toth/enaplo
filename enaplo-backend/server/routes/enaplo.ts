import * as express from 'express';

export class RouterEnaplo {
  register( router: express.Router ) {
    router.get( '/api/enaplo', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      response.json(
        [
          { id: '23130', x: '2017/340/7', name: 'ház2', address: '1039 Budajenő HRSZ:1234', owner: { name: 'Gabtoth72', nuj: '235847809' } },
          { id: '23129', x: '2017/1347/4', name: 'ház1', address: '1034 Bucsa HRSZ:1234', owner: { name: 'Gabtoth72', nuk: '235847809' } }
        ] );
    });

    router.get( '/api/enaplo/:id', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      console.log( request.params );
      const id = request.params.id;

      if ( id === undefined ) {
        response
          .status( 400 )
          .send( 'No string as id' );
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
