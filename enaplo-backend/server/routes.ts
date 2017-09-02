import * as express from 'express';
import { RouterRoot, RouterEnaplo, RouterSimulator } from './routes/exports';
import config from './config';

const router = express.Router();

new RouterRoot().register( router );
new RouterEnaplo().register( router );

if ( config.hasSimulator ) {
  new RouterSimulator().register( router );
}

export = router;