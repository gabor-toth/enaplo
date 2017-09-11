import { TestBed, inject } from '@angular/core/testing';

import { NaploService } from './naplo.service';

describe( 'NaploService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule( {
			providers: [ EnaploService ]
		} );
	} );

	it( 'should be created', inject( [ EnaploService ], ( service: EnaploService ) => {
		expect( service ).toBeTruthy();
	} ) );
} );
