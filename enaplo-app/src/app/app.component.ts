import { ServiceLocator } from './common/service-locator';
import { Component, Injector } from '@angular/core';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
	title = 'E-Napló';

	constructor(
		private injector: Injector
	) {
		ServiceLocator.injector = this.injector;
	}
}
