//import * as esprima from 'esprima';
import * as slashes from 'slashes';
import { Handler } from 'htmlparser2';
import { BaseParser } from './base-parser';
import { Enaplo, Szemely } from '../model/enaplo';

class EnaplokCollector implements Handler {
  private items: Array<Enaplo>;
  private inStrong: boolean;
  private item: Enaplo;

  constructor() {
    this.items = new Array;
  }

  public onopentag( tagname: string, attributes: { [ type: string ]: string } ): void {
    if ( tagname === 'div' ) {
      this.item = new Enaplo();
      this.item.id = attributes.azon;
    } else if ( tagname == 'strong' ) {
      this.inStrong = true;
    }
  }
  public ontext( text: string ): void {
    if ( this.inStrong ) {
      this.processData( text );
      this.inStrong = false;
    }
  }

  private processData( text: string ): void {
    // 2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)
    var regex = /([0-9/]+)\s+([^:]+):\s+(.+) \((.+) - ([0-9]+)\)/;
    var matches = regex.exec( text );
    if ( matches == null || matches.length != 6 ) {
      throw new SyntaxError( "Unparseable data: '" + text + "'" );
    }

    // { azon: '2017/340/7', nev: 'ház2', cim: '1039 Budajenő HRSZ:1234', tulajdonos: { nev: 'Gabtoth72', nuj: '235847809' }
    this.item.azon = matches[ 1 ];
    this.item.nev = matches[ 2 ];
    this.item.cim = matches[ 3 ];
    this.item.tulajdonos = new Szemely();
    this.item.tulajdonos.nev = matches[ 4 ];
    this.item.tulajdonos.nuj = matches[ 5 ];

    this.items.push( this.item );
    this.item = null;
  }

  public getData(): Array<Enaplo> {
    return this.items;
  }
}

export class EnaplokParser extends BaseParser {
  public parse(): Array<Enaplo> {
    this.skip( "$('#enaploAktaFa').html(" );
    const html = this.readString();
    const collector = new EnaplokCollector();
    this.parseHtml( html, collector );
    return collector.getData();
  }
}

