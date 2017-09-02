import * as express from 'express';
import * as routes from './routes';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as root from 'app-root-path';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import config from './config';

const app = express();

// view engine setup
app.set( 'views', path.join( root.path, 'server/views/' ) );
app.set( 'view engine', 'ejs' );

// modules
app.use( logger( config.dev ? 'dev' : 'combined' ) );
app.use( bodyParser.text( "text" ) );
//app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
} ) );
app.use( cookieParser() );

// cors for rest, see https://www.npmjs.com/package/cors
// use it before all route definitions
app.use( cors( { origin: config.corsUrl } ) );

// routes
app.use( '/', routes );

// catch 404 and forward to error handler
app.use(( request: express.Request, response: express.Response, next: express.NextFunction ) => {
  const error: any = new Error( 'Not Found' );
  error.status = 404;
  next( error );
} );

function mapExceptionToStatusCode( error: any ) {
  const exceptionClass = error.constructor.name;
  if ( "SyntaxError" == exceptionClass ) {
    error.status = 400;
  }
}
app.use( function( error: any, request: express.Request, response: express.Response, next: Function ) {
  console.error( error );
  mapExceptionToStatusCode( error );
  var status = error.status || 500;
  response.status( status );
  response.render( 'error', {
    message: error.message,
    // development error handler will print stacktrace for internal server errors
    error: config.dev && status == 500 ? error : {}
  } );
} );

export default app;
