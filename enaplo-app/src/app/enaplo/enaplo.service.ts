import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Enaplo } from './enaplo';

@Injectable()
export class EnaploService {

  private headers = new Headers( { 'Content-Type': 'application/json' } );
  private apiUrl = 'http://localhost:3000/api/enaplok';  // URL to web api

  constructor( private http: Http ) { }

  getAll(): Promise<Enaplo[]> {
    return this.http.get( this.apiUrl )
      .toPromise()
      .then( response => response.json().data as Enaplo[] )
      .catch( this.handleError );
  }

  get( id: number ): Promise<Enaplo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get( url )
      .toPromise()
      .then( response => response.json().data as Enaplo )
      .catch( this.handleError );
  }

  delete( id: number ): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete( url, { headers: this.headers } )
      .toPromise()
      .then(() => null )
      .catch( this.handleError );
  }

  create( name: string ): Promise<Enaplo> {
    return this.http
      .post( this.apiUrl, JSON.stringify( { name: name } ), { headers: this.headers } )
      .toPromise()
      .then( res => res.json().data as Enaplo )
      .catch( this.handleError );
  }

  update( entity: Enaplo ): Promise<Enaplo> {
    const url = `${this.apiUrl}/${entity.id}`;
    return this.http
      .put( url, JSON.stringify( entity ), { headers: this.headers } )
      .toPromise()
      .then(() => entity )
      .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error( 'An error occurred', error ); // for demo purposes only
    return Promise.reject( error.message || error );
  }
}
