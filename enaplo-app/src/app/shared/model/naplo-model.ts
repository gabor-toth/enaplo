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

	constructor( azonosito?: string ) {
		this._type = 'Szerepkor';
		this.azonosito = azonosito;
	}
}

export class Naplo {
	public _type: string;
	public sorszam: string;
	public azonosito: string;
	public nev: string;
	public telepules: string;
	public iranyitoszam: string;
	public helyrajziszam: string;
	public tulajdonos: Szemely;
	public szerepkorok: Array<Szerepkor>;

	public fonaplok: Array<Fonaplo>;

	constructor() {
		this._type = 'Naplo';
		this.szerepkorok = new Array<Szerepkor>();
		this.fonaplok = [];
	}

	public get originalString(): string {
		// 2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)
		return this.azonosito + ' ' + this.nev + ': ' + this.iranyitoszam + ' ' + this.telepules +
			' HRSZ: ' + this.helyrajziszam + ' (' + this.tulajdonos.nev + ' - ' + this.tulajdonos.nuj + ' )';
	}
}

export class NaploBase {
	public _type: string;
	public sorszam: string;
	public naplosorszam: string;
	public azonosito: string;
	public nev: string;
	public cim: string;
	public tulajdonos: Szemely;
	public szerepkorok: Array<Szerepkor>;

	constructor( _type: string ) {
		this._type = _type;
		this.szerepkorok = new Array<Szerepkor>();
	}


	public get originalString(): string {
		// 2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)
		let s = this.azonosito + ' ' + this.nev;
		if ( this.cim !== undefined ) {
			s += ': ' + this.cim;
		}
		if ( this.tulajdonos !== undefined ) {
			s += ' (' + this.tulajdonos.nev + ' - ' + this.tulajdonos.nuj + ' )';
		}
		return s;
	}
}




export class Fonaplo extends NaploBase {
	public alnaplok: Array<Alnaplo>;

	constructor() {
		super( 'Fonaplo' );
		this.alnaplok = [];
	}
}

export class Alnaplo extends NaploBase {
	constructor() {
		super( 'Alnaplo' );
	}
}
