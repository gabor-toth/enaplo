import { BaseComponent } from '../common/component/base.component';
import { ValueListsService } from '../shared/service/value-lists.service';
import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-beallitasok',
	templateUrl: './beallitasok.component.html',
	styleUrls: [ './beallitasok.component.css' ]
} )
export class BeallitasokComponent extends BaseComponent implements OnInit {
	constructor( private valueListsService: ValueListsService ) {
		super();
	}

	protected getComponentName(): string {
		return 'BeallitasokComponent';
	}

	ngOnInit() {
	}

	public clearCaches(): void {
		this.valueListsService.clearAllCaches();
		this.showActionFeedback( 'Gyorsítótárak törölve' );
	}
}
