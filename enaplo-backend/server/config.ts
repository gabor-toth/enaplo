// import { Container, Inject, Service } from "typedi";

// @Service

export class Config {
	private _targetUrlBase: string;
	private _corsUrl: any;
	private _listenOnPort: number;
	private _dev: boolean;
	private _hasSimulator: boolean;

	constructor() {
		const argv = require( 'minimist' )( process.argv.slice( 2 ) );
		this._dev = ( process.env.NODE_ENV || 'development' ) === 'development';

		this.setListenOnPort( argv );
		this.setTargetUrlBase( argv );
		this.setCorsUrl( argv );

		// console.log( 'Using config: ' + JSON.stringify( this ) );
	}

	private setListenOnPort( argv: any ): void {
		this._listenOnPort = argv.port || 3000;
	}

	private setCorsUrl( argv: any ): void {
		this._corsUrl = [ 'http://localhost:4200', 'http://192.168.1.130:4200' ];
		// this._corsUrl = /^chrome-extension:\/\/.*/;
	}

	private setTargetUrlBase( argv: any ): void {
		const targetSystem = argv.targetSystem || 'local';

		switch ( targetSystem ) {
			case 'local':
				this._targetUrlBase = 'http://localhost:3000/enaplo_demo/';
				this._hasSimulator = true;
				break;
			case 'live':
				this._targetUrlBase = 'http://localhost:3000/enaplo_demo/';
				this._hasSimulator = false;
				break;
			default:
				throw new Error( 'Unknown targetSystem ' + targetSystem );
		}
	}

	get hasSimulator(): boolean {
		return this._hasSimulator;
	}

	get dev(): boolean {
		return this._dev;
	}

	get corsUrl(): any {
		return this._corsUrl;
	}

	get targetUrlBase(): string {
		return this._targetUrlBase;
	}

	get listenOnPort(): number {
		return this._listenOnPort;
	}
}

const config: Config = new Config();

export default config;
