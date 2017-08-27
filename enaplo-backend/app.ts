import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as root from 'app-root-path';
import * as cookieParser from 'cookie-parser';
import * as routes from './server/routes';

const app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
  extended: false
}) );

app.use( cookieParser() );

// https://www.npmjs.com/package/cors
var cors = require( 'cors' );
// use it before all route definitions
app.use( cors( { origin: 'http://localhost:4200' }) );

app.use( '/', routes );

// catch 404 and forward to error handler
app.use(( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  let err: any = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

// error handlers
// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use(( err: any, req: express.Request, res: express.Response, next: express.NextFunction ) => {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: err
    });
  });
}

app.use( function( err: any, req: express.Request, res: express.Response, next: Function ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  });
});

export = app;
