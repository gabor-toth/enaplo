import { BaseService } from '../service/base.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ServiceLocator } from '../../common/service/service-locator';
import { ServiceCallStateObserver } from '../service/service-call-state-callback';
import { environment } from '../../../environments/environment';

export class BaseComponent implements ServiceCallStateObserver {
	loading = false;
	progressType = 'indeterminate';
	progressValue = 0;
	loadTimer: any;
	loadError: string;
	snackBar: MatSnackBar;

	constructor() {
		this.snackBar = ServiceLocator.injector.get( MatSnackBar );
	}

	onServiceCallStart(): void {
		this.loadError = null;
		this.progressType = 'indeterminate';
		this.progressValue = 0;
		this.loadTimer = setTimeout(() => this.loading = true, 300 );
	}

	onServiceCallProgress( percent: number ): void {
		this.progressType = 'determinate';
		this.progressValue = percent;
	}

	onServiceCallEnd(): void {
		this.loading = false;
		clearTimeout( this.loadTimer );
		this.loadTimer = null;
	}

	onServiceError( error: number ): void {
		let message: string;
		const actionLabel: string = undefined;
		switch ( error ) {
			case BaseService.ERROR_CONNECTION_REFUSED:
				message = 'A szerver nem elérhető. Kérem ellenőrizze az internetkapcsolatát.';
				// actionLabel = 'Újra';
				break;
			case BaseService.ERROR_UNATHORIZED:
				message = 'Lépjen be az E-napló rendszerbe egy másik ablakban. <a href="" target="_blank">Link</a>';
				break;
			default:
				message = 'Ismeretlen hiba';
				break;
		}
		// { extraClasses: [ 'alert-danger' ] }
		const snackBarRef = this.snackBar.open( message, actionLabel );
		if ( actionLabel !== undefined ) {
			snackBarRef.onAction().subscribe(() => {
				// refreshNaplok(true)
				console.log( 'The snack-bar action was triggered!' );
			} );
		}
	}

	protected getLocalStorageName( componentDotPropertyName: string ): string {
		return environment.localStorageName + '.' + componentDotPropertyName;
	}
}
