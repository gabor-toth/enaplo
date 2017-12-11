import { BaseService } from '../service/base.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ServiceLocator } from '../../common/service/service-locator';
import { ServiceCallStateObserver } from '../service/service-call-state-callback';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../service/local-storage.service';

export abstract class BaseComponent implements ServiceCallStateObserver {
	protected localStorageService: LocalStorageService;
	loading = false;
	progressType = 'indeterminate';
	progressValue = 0;
	loadTimer: any;
	loadError: string;
	snackBar: MatSnackBar;

	constructor() {
		this.snackBar = ServiceLocator.injector.get( MatSnackBar );
		this.localStorageService = ServiceLocator.injector.get( LocalStorageService );
	}

	protected abstract getComponentName(): string;

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

	onServiceError( error: any ): void {
		let message: string;
		let actionLabel: string;
		let action;
		switch ( error ) {
			case BaseService.ERROR_CONNECTION_REFUSED:
				message = 'A szerver nem elérhető. Kérem ellenőrizze az internetkapcsolatát.';
				// actionLabel = 'Újra';
				break;
			case BaseService.ERROR_UNATHORIZED:
				message = 'Lépjen be az E-napló rendszerbe egy másik ablakban.';
				actionLabel = 'Megnyitás';
				action = function() {
					window.open( environment.enaploLoginUrl, '_blank ' );
				};
				break;
			default:
				message = 'Ismeretlen hiba';
				if ( error instanceof TypeError ) {
					console.error( error );
				} else {
					console.error( 'Unknown error:' + error );
				}
				break;
		}
		// { extraClasses: [ 'alert-danger' ] }
		const snackBarRef = this.snackBar.open( message, actionLabel, { politeness: 'assertive' } );
		if ( actionLabel !== undefined && action !== undefined ) {
			snackBarRef.onAction().subscribe(() => {
				action();
			} );
		}
	}

	protected showActionFeedback( message: string ): void {
		this.snackBar.open( message, null, { duration: environment.snackBarDefaultDuration } );
	}

	protected loadSettingsWithDefault( propertyName: string, defaultValue: any ): any {
		return this.localStorageService.getItemWithDefault( this.getComponentName(), propertyName, defaultValue );
	}

	protected setOrClearValueInSettingsMap( mapOfValues: any, key: any, value: any, propertyName?: string ): void {
		if ( value === undefined ) {
			delete mapOfValues[ key ];
		} else {
			mapOfValues[ key ] = value;
		}
		if ( propertyName !== undefined ) {
			this.localStorageService.setItem( this.getComponentName(), propertyName, mapOfValues );
		}
	}
}
