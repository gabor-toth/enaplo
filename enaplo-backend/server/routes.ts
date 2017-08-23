import * as express from 'express';
import {RouterRoot} from './routes/root';
import {RouterEnaplo} from './routes/enaplo';

const router = express.Router();

new RouterRoot().register( router );
new RouterEnaplo().register( router );

export = router;