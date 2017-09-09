import { BaseParser, Handler } from './base-parser';
import { Fonaplo, Szemely, Szerepkor } from '../model/enaplo';

class StringSplitter {
	constructor( private text: string ) {
	}

	public parenthesedEnd(): string {
		const text = this.text;
		let index = text.length - 1;
		if ( text.charAt( index ) != ')' ) {
			return null;
		}

		index--;
		let result = '';
		let nesting = 0;
		while ( index >= 0 ) {
			const c = text.charAt( index );
			if ( c == ')' ) {
				nesting++;
			} else if ( c == '(' ) {
				if ( nesting == 0 ) {
					break;
				}
				nesting--;
			}
			result = c + result;
			index--;
		}

		this.text = text.substring( 0, index );
		return result;
	}

	get rest() {
		return this.text;
	}
}

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
			const ids = attributes.azon.split( '|' );
			this.item.naplosorszam = ids[ 0 ];
			this.item.sorszam = ids[ 1 ];
			this.inDiv = true;
		}
	}

	public ontext( text: string ): void {
		if ( this.inDiv ) {
			if ( this.processData( text ) ) {
				this.inDiv = false;
			}
		}
	}

	public onclosetag( tagname: string ): void {
		if ( tagname === 'div' ) {
			this.inDiv = false;
		}
	}

	private processData( text: string ): boolean {
		text = text.trim();
		if ( text.length == 0 ) {
			return false;
		}
		// 2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős, Kivitelező - napijelentésre jogosult, Építési műszaki ellenőr (Építészet))
		const splitter = new StringSplitter( text );
		const roles = splitter.parenthesedEnd();

		text = splitter.rest;
		const regex = /^([0-9\-/]+) (.+)\s*$/;
		const matches = regex.exec( text );

		if ( roles == null || matches == null || matches.length != 3 ) {
			throw new SyntaxError( 'Unparseable fonaplo data: \'' + text + '\'' );
		}

		let index = 1;
		this.item.azonosito = matches[ index++ ];
		this.item.nev = matches[ index++ ];

		for ( const role of roles.split( ', ' ) ) {
			this.item.szerepkorok.push( new Szerepkor( role ) );
		}

		this.items.push( this.item );
		this.item = null;

		return true;
	}

	public getData(): Array<Fonaplo> {
		return this.items;
	}
}

export class FonaploParser extends BaseParser {
	public parse(): Array<Fonaplo> {
		this.skip( 'insertNaploItems(\'enaploAktaFa\',' );
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
