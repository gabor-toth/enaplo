import * as express from 'express';
import * as routes from './routes';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as root from 'app-root-path';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

const app = express();

// view engine setup
app.set( 'views', path.join( root.path, 'server/views/' ) );
app.set( 'view engine', 'ejs' );

// modules
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( cookieParser() );

// cors for rest, see https://www.npmjs.com/package/cors
// use it before all route definitions
app.use( cors( { origin: 'http://localhost:4200' } ) );

// routes
app.use( '/', routes );

// catch 404 and forward to error handler
app.use(( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  let err: any = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );

app.use( function( err: any, req: express.Request, res: express.Response, next: Function ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    // development error handler will print stacktrace
    error: app.get( 'env' ) === 'development' ? err : {}
  } );
} );

export default app;
