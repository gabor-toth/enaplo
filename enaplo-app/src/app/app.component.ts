import { ServiceLocator } from './common/service-locator';
import { Component, Injector } from '@angular/core';

class Tab {
	route: string;
	label: string;
}

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
	title = 'E-Napló';

	tabs: Tab[];

	constructor(
		private injector: Injector
	) {
		ServiceLocator.injector = this.injector;

		this.tabs = [
			{ route: 'naplok', label: 'Naplók' },
			{ route: 'teendok', label: 'Teendők' },
			{ route: 'beallitasok', label: 'Beállítások' }
		];
	}
}
