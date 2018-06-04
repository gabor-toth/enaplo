import { DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf } from 'rxjs';

export class ArrayDataSource<T> extends DataSource<T> {
	data: T[];

	constructor( data: T[] ) {
		super();
		this.data = data;
	}

	connect(): Observable<T[]> {
		return observableOf( this.data );
	}

	disconnect() { }
}
