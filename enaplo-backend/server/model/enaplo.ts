export class Szemely {
  public _type: string;
  public nev: string;
  public nuj: string;

  constructor() {
    this._type = ( this as any ).constructor.name;
  }
}

export class Szerepkor {
  public _type: string;
  public id: string;
  public nev: string;

  constructor( nev?: string ) {
    this._type = ( this as any ).constructor.name;
    this.nev = nev;
  }
}

export class Naplo {
  public _type: string;
  public id: string;
  public azon: string;
  public nev: string;
  public cim: string;
  public tulajdonos: Szemely;
  public szerepkorok: Array<Szerepkor>;

  constructor() {
    this._type = ( this as any ).constructor.name;
    this.szerepkorok = new Array<Szerepkor>();
  }
}

export class Fonaplo {
  public _type: string;
  public id: string;
  public azon: string;
  public nev: string;
  public cim: string;
  public tulajdonos: Szemely;
  public szerepkorok: Array<Szerepkor>;

  constructor() {
    this._type = ( this as any ).constructor.name;
    this.szerepkorok = new Array<Szerepkor>();
  }
}
