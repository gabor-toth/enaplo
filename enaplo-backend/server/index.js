// see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0

import * as http from 'http';
import app from './server';
import config from './config';

let currentApp = app;

const server = http.createServer( app );
server.listen( config.listenOnPort );

// when moved to TypeScript source, this part does not work anmymore
if ( module.hot ) {
  module.hot.accept( './server', () => {
    server.removeListener( 'request', currentApp );
    server.on( 'request', app );
    currentApp = app;
  } );
}
