import * as Nedb from 'nedb';
import * as root from 'app-root-path';
import * as path from 'path';

export abstract class BaseDataRouter {
	protected datastore: Nedb;

	public static getDatastore( tableName: string ): Nedb {
		return new Nedb( { filename: path.join( root.path, 'database', tableName + '.nedb' ), autoload: true } );
	}

	constructor() {
		this.datastore = BaseDataRouter.getDatastore( this.getTableName() );
	}

	protected abstract getTableName(): string;

}
