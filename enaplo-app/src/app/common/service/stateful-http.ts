/*
import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod } from '@angular/http';
import { Observable, Subscription, Subscriber } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';

import { ServiceLocator } from '../service/service-locator';
import { ServiceCallStateCallback } from './service-call-state-callback';

export class StatefulHttp {
	protected http: Http;

	constructor() {
		this.http = ServiceLocator.injector.get( Http );
	}

	public get( url: string, search: string, stateCallback: ServiceCallStateCallback, headers?: Headers ): Observable<any> {
		return this.requestHelper( RequestMethod.Get, url, search, null, stateCallback, headers );
	}

	public delete( url: string, search: string, stateCallback: ServiceCallStateCallback, headers?: Headers ): Observable<any> {
		return this.requestHelper( RequestMethod.Delete, url, search, null, stateCallback, headers );
	}

	public post( url: string, data: any, stateCallback: ServiceCallStateCallback, headers?: Headers ): Observable<any> {
		return this.requestHelper( RequestMethod.Post, url, null, data, stateCallback, headers );
	}

	public put( url: string, data: any, stateCallback: ServiceCallStateCallback, headers?: Headers ): Observable<any> {
		return this.requestHelper( RequestMethod.Put, url, null, data, stateCallback, headers );
	}

	protected requestHelper( method: RequestMethod, url: string, search: string, payload: any,
		stateCallback: ServiceCallStateCallback, headers?: Headers ): Observable<any> {
		return this.request( new Request( {
			method,
			url,
			search: search,
			headers: headers,
			body: payload // != null? payload : undefined
		} ), stateCallback );
	}

	protected request( request: Request, stateCallback: ServiceCallStateCallback ): Observable<any> {
		// create our own observer so we can check the response before passing it back to the caller
		const observable: Observable<any> = new Observable( observer => {
			stateCallback.onServiceCallStart();
			// fire the REST call
			let observable: Observable<any> = this.http.request( request );
			// subscribe to it
			let subscription: Subscription = observable.subscribe(
				response => {
					// we got a response, check it
					let err = this.checkResponse( observable, subscription, response );
					if ( err ) {
						// not good
						observer.error( err );
						this.restObserver.failure();
					} else {
						// was ok, pass back to caller
						observer.next( response );
						this.restObserver.success();
					}
					// we are finished, no more data from us
					observer.complete();
				},
				error => {
					// got an error
					if ( error.status && error.status == 401 ) {
						// translate 401 to UnauthorizedError to easy of handling it
						// not logged in, or bad username/pwd for login
						observer.error( new UnauthorizedError() );
					} else if ( error.status && error.status == 409 ) {
						// not logged in, or bad username/pwd for login
						observer.error( new ConflictError( error.json ? error.json().field : null ) );
					} else {
						// other errors go into the same hat
						observer.error( error.json && error.json().error || error );
					}
					this.restObserver.failure();
					// we are finished, no more data from us
					observer.complete();
				} );
		} )
			.share(); // use this or you'll get separate observers for each subscription
		return observable;
	}

	protected checkResponse( observable: Observable<any>, subscription: Subscription, response: Response ): any {
		let status = response.status;
		switch ( status ) {
			case 204:
				// we are ok, content is empty, content type is null, so nothing to check here
				return null;
			case 200:
				// request was ok, ensure content type is JSON and not HTML
				let headers = response.headers;
				let contentType = headers.get( 'content-type' );
				if ( contentType != 'application/json' ) {
					return 'Wrong content-type ' + contentType;
				}
				// we are ok
				return null;
			default:
				// other errors
				return 'Status code ' + status;
		}
	}
}
*/
