//import * as esprima from 'esprima';
import * as slashes from 'slashes';
import { Handler } from 'htmlparser2';
import { BaseParser } from './base-parser';
import { Fonaplo, Szemely, Szerepkor } from '../model/enaplo';

class FonaploCollector implements Handler {
  private items: Array<Fonaplo>;
  private item: Fonaplo;
  private inDiv = true;

  constructor() {
    this.items = new Array;
  }

  public onopentag( tagname: string, attributes: { [ type: string ]: string } ): void {
    if ( tagname === 'div' ) {
      this.item = new Fonaplo();
      this.item.id = attributes.azon;
      this.inDiv = true;
    }
  }

  public ontext( text: string ): void {
    if ( this.inDiv ) {
      this.processData( text );
      this.inDiv = false;
    }
  }

  public onclosetag( tagname: string ): void {
    if ( tagname === 'div' ) {
      this.inDiv = false;
    }
  }

  private processData( text: string ): void {
    // 2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős, Kivitelező - napijelentésre jogosult)
    var regex = /^([0-9\-/]+) (.+) \((.+(,.+)*)\)$/;
    var matches = regex.exec( text );
    if ( matches == null || matches.length != 5 ) {
      throw new SyntaxError( "Unparseable fonaplo data: '" + text + "'" );
    }

    this.item.azon = matches[ 1 ];
    this.item.nev = matches[ 2 ];
    const roles = matches[ 3 ].split( ', ' );
    for ( let role of roles ) {
      this.item.szerepkorok.push( new Szerepkor( role ) );
    }

    this.items.push( this.item );
    this.item = null;
  }

  public getData(): Array<Fonaplo> {
    return this.items;
  }
}

export class FonaploParser extends BaseParser {
  public parse(): Array<Fonaplo> {
    this.skip( "insertNaploItems('enaploAktaFa'," );
    this.readString(); // id
    this.skip( ',' );
    const html = this.readString();
    const collector = new FonaploCollector();
    this.parseHtml( html, collector );
    return collector.getData();
  }
}

/*
 insertNaploItems('enaploAktaFa','23129','
  <ul class=\'fa_naplo\'>
  <li class=\'r0\'>
    <div class=\'naploelem sajat\' style=\'padding-left:38px;\' 
        tipus=1 
        azon=\'23129|20963\' title=\'Az E-főnapló adatainak megmutatása\'>
      <i class=\'icon-null\'></i> <i class=\'icon-list\' title=\'E-főnapló\'></i> 
      2017/1347/4-1 blabla (Építtető) 
      <i class=\'icon-user\' title=\'Szerep\'></i>
    </div>
  </li>
  <li class=\'r1\'>
    <div class=\'naploelem sajat\' style=\'padding-left:38px;\' 
        tipus=1 
        azon=\'23129|20964\' title=\'Az E-főnapló adatainak megmutatása\'>
      <i class=\'icon-null\'></i> <i class=\'icon-list\' title=\'E-főnapló\'></i> 
      2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős, Kivitelező - napijelentésre jogosult) 
      <i class=\'icon-user\' title=\'Szerep\'></i>
    </div>
  </li>
  </ul>');
*/
