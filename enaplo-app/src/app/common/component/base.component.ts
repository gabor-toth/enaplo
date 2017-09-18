import { BaseService } from '../service/base.service';
import { Component, OnInit } from '@angular/core';

import { ServiceCallStateObserver } from '../service/service-call-state-callback';

export class BaseComponent implements ServiceCallStateObserver {
	loading = false;
	loadTimer: any;
	loadError: string;

	onServiceCallStart(): void {
		this.loadError = null;
		this.loadTimer = setTimeout(() => this.loading = true, 300 );
	}

	onServiceCallEnd(): void {
		this.loading = false;
		clearTimeout( this.loadTimer );
		this.loadTimer = null;
	}

	onServiceError( error: number ): void {
		switch ( error ) {
			case BaseService.ERROR_CONNECTION_REFUSED:
				// TODO i18n
				this.loadError = 'A szerver nem elérhető. Kérem ellenőrizze az internetkapcsolatát.';
				break;
			case BaseService.ERROR_UNATHORIZED:
				this.loadError = 'Lépjen be az E-napló rendszerbe egy másik ablakban. <a href="" target="_blank">Link</a>';
				break;
			default:
				this.loadError = 'Ismeretlen hiba';
				break;
		}
	}
}
