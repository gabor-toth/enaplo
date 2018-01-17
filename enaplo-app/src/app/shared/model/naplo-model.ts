import { forEachChild } from 'typescript';
export class Szemely {
	public _type: string;
	public nev: string;
	public nuj: string;

	constructor() {
		this._type = 'Szemely';
	}
}

export class Szerepkor {
	public _type: string;
	public id: string;
	public azonosito: string;
	public nev: string;
	public szakag: string;
	public szakagAzonosito: string;

	constructor( nev?: string, szakag?: string ) {
		this._type = 'Szerepkor';
		this.nev = nev;
		this.szakag = szakag;
	}
}

export abstract class NaploBase {
	public _type: string;
	public sorszam: string;
	public azonosito: string;
	public aktaId: string;
	public nev: string;
	public naplosorszam: string;
	public szerepkorok: Array<Szerepkor>;
	public naplok: Array<NaploBase>;
	public parent: NaploBase;
	public rootParent: Naplo;

	constructor( _type: string ) {
		this._type = _type;
		this.szerepkorok = new Array<Szerepkor>();
		this.naplok = [];
	}

	abstract get originalString(): string;
	abstract get display(): string;

	protected setParent( rootParent: Naplo, parent: NaploBase ): void {
		this.aktaId = rootParent.sorszam;
		this.rootParent = rootParent;
		this.parent = parent;
		if ( this.naplok != null ) {
			for ( const child of this.naplok ) {
				child.setParent( rootParent, this );
			}
		}
	}
}

export class Naplo extends NaploBase {
	public telepules: string;
	public iranyitoszam: string;
	public helyrajziszam: string;
	public tulajdonos: Szemely;

	constructor() {
		super( 'Naplo' );
	}

	public setNaplok( naplok: Array<NaploBase> ): void {
		this.naplok = naplok;
		this.setParent( this, this );
	}

	public get originalString(): string {
		// 2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)
		return this.azonosito + ' ' + this.nev + ': ' + this.iranyitoszam + ' ' + this.telepules +
			' HRSZ: ' + this.helyrajziszam + ' (' + this.tulajdonos.nev + ' - ' + this.tulajdonos.nuj + ' )';
	}

	public get display(): string {
		// 2017/340/7 ház2: 1039 Budajenő HRSZ:1234
		return this.azonosito + ' ' + this.nev + ': ' + this.iranyitoszam + ' ' + this.telepules +
			' HRSZ: ' + this.helyrajziszam;
	}
}

export class NaploSubBase extends NaploBase {
	public cim: string;
	public tulajdonos: Szemely;

	constructor( _type: string ) {
		super( _type );
	}

	public get originalString(): string {
		let s = this.azonosito + ' ' + this.nev;
		if ( this.cim !== undefined ) {
			s += ': ' + this.cim;
		}
		if ( this.tulajdonos !== undefined ) {
			s += ' (' + this.tulajdonos.nev + ' - ' + this.tulajdonos.nuj + ' )';
		}
		return s;
	}

	public get display(): string {
		let s = '';
		if ( this.parent !== undefined ) {
			s = this.parent.display + ' - ';
		}
		s += this.azonosito + ' ' + this.nev;
		if ( this.cim !== undefined ) {
			s += ': ' + this.cim;
		}
		return s;
	}
}


export class Fonaplo extends NaploSubBase {
	constructor() {
		super( 'Fonaplo' );
	}
}

export class Alnaplo extends NaploSubBase {
	constructor() {
		super( 'Alnaplo' );
	}
}
