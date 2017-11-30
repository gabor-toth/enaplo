import * as express from 'express';
import { RouterRoot, RouterEnaplo, RouterSzerepkor, RouterSimulator } from './routes/exports';
import config from './config';

const router = express.Router();

new RouterRoot().register( router );
new RouterEnaplo().register( router );
new RouterSzerepkor().register( router );

if ( config.hasSimulator ) {
	new RouterSimulator().register( router );
}

export = router;
