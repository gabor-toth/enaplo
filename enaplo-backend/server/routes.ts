import * as express from 'express';
import {RouterRoot} from './routes/root';
import {RouterEnaplok} from './routes/enaplok';
import {RouterEnaplo} from './routes/enaplo';
import {RouterSimulator} from './routes/simulator/simulator';

const router = express.Router();

new RouterRoot().register( router );
new RouterEnaplok().register( router );
new RouterEnaplo().register( router );
new RouterSimulator().register( router );

export = router;