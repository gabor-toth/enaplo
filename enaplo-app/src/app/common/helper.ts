import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class ArrayDataSource<T> extends DataSource<T> {
	data: T[];

	constructor( data: T[] ) {
		super();
		this.data = data;
	}

	connect(): Observable<T[]> {
		return Observable.of( this.data );
	}

	disconnect() { }
}
