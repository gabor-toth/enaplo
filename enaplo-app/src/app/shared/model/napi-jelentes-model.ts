export class NapiLetszam {
	public _type: string;
	public szakma: number;
	public fo: number;
	public megjegyzes: string;

	constructor() {
		this._type = 'NapiLetszam';
	}
}

export class NapiAlvallalkozoiLetszam {
	public _type: string;
	public naploSorszam: string;
	public alvallalkozo: string;
	public fo: number;

	constructor() {
		this._type = 'NapiAlvallalkozoiLetszam';
	}
}

export class NapiBejegyzes {
	public _type: string;
	public idopont: Date;
	public tipus: number;
	public szerep: number;
	public szakag: number;
	public szoveg: string;
	public csatolmany: any;

	constructor() {
		this._type = 'NapiBejegyzes';
	}
}

export class NapiJelentes {
	public _type: string;
	public unknown1: string;
	public datum: Date;
	public minimumHomerseklet: number;
	public maximumHomerseklet: number;
	public unknown2: string;
	public szelero: number;
	public szelirany: number;
	public egkep: number;
	public csapadek: number;
	public egyebIdojaras: string;
	public munkavegzes: boolean;
	public munkaido_kezdet: string;
	public munkaido_veg: string;
	public napiJelentesLehetseges: boolean;
	public napiBejegyzesLehetseges: boolean;

	public letszamok: NapiLetszam[];
	public alvallalkozoiLetszamok: NapiAlvallalkozoiLetszam[];
	public bejegyzesek: NapiBejegyzes[];

	constructor( fields?: string[] ) {
		this._type = 'NapiJelentes';
		this.letszamok = [];
		this.alvallalkozoiLetszamok = [];
		this.bejegyzesek = [];

		if ( fields != null ) {
			let p = 1;
			this.unknown1 = fields[ p++ ];
			this.datum = new Date( fields[ p++ ] );
			this.minimumHomerseklet = Number.parseFloat( fields[ p++ ] );
			this.maximumHomerseklet = Number.parseFloat( fields[ p++ ] );
			this.unknown2 = fields[ p++ ];
			this.szelero = Number.parseInt( fields[ p++ ] );
			this.szelirany = Number.parseInt( fields[ p++ ] );
			this.egkep = Number.parseInt( fields[ p++ ] );
			this.csapadek = Number.parseInt( fields[ p++ ] );
			this.egyebIdojaras = fields[ p++ ];
			this.munkavegzes = '1' == fields[ p++ ];
			this.munkaido_kezdet = fields[ p++ ];
			this.munkaido_veg = fields[ p++ ];
			p++; // wwekDay
			this.napiJelentesLehetseges = 'true' == fields[ p++ ];
			this.napiBejegyzesLehetseges = 'true' == fields[ p++ ];
		}
	}

}
