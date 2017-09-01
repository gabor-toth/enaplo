export class Szemely {
  public _type: string;
  public nev: string;
  public nuj: string;

  constructor() {
    this._type = ( this as any ).constructor.name;
  }
}

export class Enaplo {
  public _type: string;
  public id: string;
  public azon: string;
  public nev: string;
  public cim: string;
  public tulajdonos: Szemely;

  constructor() {
    this._type = ( this as any ).constructor.name;
  }
}
