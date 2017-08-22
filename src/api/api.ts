import { RootRouter } from './routes/RootRouter';

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as debug from 'debug';

// Creates and configures an ExpressJS web server.
export class Api {
  server: http.Server;
  port: number;

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();

    this.port = 3000;
  }

  run(): void {
    this.server = http.createServer( this.express );
    this.server.listen( this.port );
    this.server.on( 'error', this.onError );
    this.server.on( 'listening', this.onListening );
  }

  onError( error: NodeJS.ErrnoException ): void {
    if ( error.syscall !== 'listen' ) {
      throw error;
    }
    const bind = 'Port ' + this.port;
    switch ( error.code ) {
      case 'EACCES':
        console.error( `${bind} requires elevated privileges` );
        process.exit( 1 );
        break;
      case 'EADDRINUSE':
        console.error( `${bind} is already in use` );
        process.exit( 1 );
        break;
      default:
        throw error;
    }
  }

  onListening(): void {
    const addr = this.server.address();
    const bind = ( typeof addr === 'string' ) ? `pipe ${addr}` : `port ${addr.port}`;
    debug( `Listening on ${bind}` );
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use( logger( 'dev' ) );
    this.express.use( bodyParser.json() );
    this.express.use( bodyParser.urlencoded( { extended: false } ) );
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();

    this.express.use( '/', new RootRouter().router );
  }

}
