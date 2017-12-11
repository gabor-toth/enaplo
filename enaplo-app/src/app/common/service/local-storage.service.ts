import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

	constructor() { }

	protected getLocalStorageName( componentName: string, propertyName: string ): string {
		let name = environment.localStorageName + '.' + componentName;
		if ( propertyName !== null ) {
			name += '.' + propertyName;
		}
		return name;
	}

	public getItemWithDefault( componentName: string, propertyName: string, defaultValue: any ): any {
		const value = JSON.parse( localStorage.getItem( this.getLocalStorageName( componentName, propertyName ) ) );
		return value !== null ? value : defaultValue;
	}

	public setItem( componentName: string, propertyName: string, value: any ): void {
		const name = this.getLocalStorageName( componentName, propertyName );
		if ( value === undefined || value === null ) {
			localStorage.removeItem( name );
		} else {
			localStorage.setItem( name, JSON.stringify( value ) );
		}
	}
}
