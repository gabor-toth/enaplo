import { BaseRouter } from './base-router';
import * as Nedb from 'nedb';
import * as root from 'app-root-path';
import * as path from 'path';

export abstract class BaseDataRouter extends BaseRouter {
	protected datastore: Nedb;

	constructor() {
		super();
		this.datastore = new Nedb( { filename: path.join( root.path, 'database', this.getTableName() + '.nedb' ), autoload: true } );
	}

	protected abstract getTableName(): string;
}
