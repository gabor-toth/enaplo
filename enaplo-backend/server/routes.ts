import * as express from 'express';
import * as Routers from './routes/exports';
import config from './config';

const router = express.Router();

new Routers.RouterRoot().register( router );
new Routers.RouterEnaplo().register( router );

if ( config.hasSimulator ) {
  new Routers.RouterSimulator().register( router );
}

export = router;