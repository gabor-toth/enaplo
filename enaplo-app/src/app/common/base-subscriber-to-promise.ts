import { Observable } from 'rxjs';

export abstract class BaseSubscriberToPromise<T> {
	protected observer: Observable<T>;
	protected resolve: ( value: any ) => void;
	protected reject: ( value: any ) => void;

	constructor( observer: Observable<T>, resolve: ( value: T ) => void, reject: ( value: any ) => void ) {
		this.observer = observer;
		this.resolve = resolve;
		this.reject = reject;

		this.observer.subscribe( this.next, this.error, this.complete );
	}

	protected abstract next( value: T ): void;
	protected abstract complete(): void;
	protected abstract error( error: any ): void;
}

