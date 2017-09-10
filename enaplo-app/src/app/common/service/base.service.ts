import { ServiceLocator } from './service-locator';
import { Http } from '@angular/http';

export abstract class BaseService {
	public static readonly ERROR_UNKNOWN = -1;
	public static readonly ERROR_CONNECTION_REFUSED = 1;
	public static readonly ERROR_UNATHORIZED = 403;

	protected getHeaders: Headers = new Headers( {} );
	protected http: Http;

	constructor() {
		this.http = ServiceLocator.injector.get( Http );
	}

	protected handleError( error: any ): Promise<any> {
		let errorCode = 0;
		if ( error.type == 2 ) {
			switch ( error.status ) {
				case 403:
					errorCode = BaseService.ERROR_UNATHORIZED;
					break;
			}
		} else if ( error.status == 0 && error.type == 3 ) {
			errorCode = BaseService.ERROR_CONNECTION_REFUSED;
		}
		if ( errorCode == 0 ) {
			console.error( 'Unhandled error: ', error );
			errorCode = BaseService.ERROR_UNKNOWN;
		}
		return Promise.reject( errorCode );
	}
}
