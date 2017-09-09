import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnaploComponent } from './naplo.component';

describe( 'NaploComponent', () => {
	let component: NaploComponent;
	let fixture: ComponentFixture<EnaploComponent>;

	beforeEach( async(() => {
		TestBed.configureTestingModule( {
			declarations: [ NaploComponent ]
		} )
			.compileComponents();
	} ) );

	beforeEach(() => {
		fixture = TestBed.createComponent( NaploComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should be created', () => {
		expect( component ).toBeTruthy();
	} );
} );
