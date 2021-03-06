import { BaseHtmlParser, Handler } from '../../base-html-parser';
import { Fonaplo, Szemely, Szerepkor, NaploBase, Alnaplo } from '../../model/naplo-model';
import { NaploStringSplitter } from './naplo-string-splitter';

/*
insertNaploItems( 'enaploAktaFa', '23129', '
<ul class='fa_naplo'>
   <li class='r0'>
      <div class='naploelem sajat' style='padding-left:38px;' tipus=1 azon='23167|20998' title='Az E-főnapló adatainak megmutatása'>
        <i class='icon-chevron-down' openstate=1 title='Az alnaplók megmutatása/elrejtése'></i>
        <i class='icon-list' title='E-főnapló'></i>
        2017/2708/1-1 alapásás (ja) (Építtető, Kivitelező - napijelentésért felelős, Tervezői művezető (Nem értelmezett))
        <i class='icon-user' title='Szerep'></i>
      </div>
      <ul class='fa_naplo'>
         <li class='r1'>
            <div class='naploelem sajat' style='padding-left:70px;' tipus=1 azon='23167|21157' title='Az E-alnapló adatainak megmutatása'>
              <i class='icon-null'></i>
              <i class='icon-list-alt' title='E-alnapló'></i>
              2017/2708/1-3 bal oldali alap (Megrendelő kivitelező)
              <i class='icon-user' title='Szerep'></i>
            </div>
         </li>
         <li class='r0'>
            <div class='naploelem sajat' style='padding-left:70px;' tipus=1 azon='23167|21158' title='Az E-alnapló adatainak megmutatása'>
              <i class='icon-null'></i>
              <i class='icon-list-alt' title='E-alnapló'></i>
              2017/2708/1-4 jobb oldlai alap (Megrendelő kivitelező)
              <i class='icon-user' title='Szerep'></i>
            </div>
         </li>
      </ul>
   </li>
   <li class='r1'>
      <div class='naploelem sajat' style='padding-left:38px;' tipus=1 azon='23167|20999' title='Az E-főnapló adatainak megmutatása'>
        <i class='icon-null'></i> <i class='icon-list' title='E-főnapló'></i>
        2017/2708/1-2 alapozás (Építtető, Építtető, Kivitelező - napijelentésért felelős, Építési műszaki ellenőr (Építészet), Felelős műszaki vezető (Épületvillamos), Biztonsági és egészségvédelmi koordinátor)
        <i class='icon-user' title='Szerep'></i>
     </div>
   </li>
</ul>
);
*/

class FonaploCollector implements Handler {
	private static NEM_ERTELMEZETT = ' (Nem értelmezett)';

	private items: Array<Fonaplo>;
	private parent: Fonaplo;
	private item: NaploBase;
	private inDiv = false;
	private ulLevel = 0;

	constructor() {
		this.items = new Array;
	}

	public onopentag( tagname: string, attributes: { [ type: string ]: string } ): void {
		if ( tagname === 'ul' ) {
			this.ulLevel++;
		} else if ( tagname === 'div' ) {
			if ( this.ulLevel == 1 ) {
				this.item = this.parent = new Fonaplo();
				this.items.push( this.parent );
			} else {
				this.item = new Alnaplo();
				this.parent.naplok.push( this.item );
			}
			const ids = attributes.azon.split( '|' );
			this.item.naplosorszam = ids[ 0 ];
			this.item.sorszam = ids[ 1 ];
			this.inDiv = true;
		}
	}

	public ontext( text: string ): void {
		if ( this.inDiv && this.processData( text ) ) {
			this.inDiv = false;
		}
	}

	public onclosetag( tagname: string ): void {
		if ( tagname === 'ul' ) {
			this.ulLevel--;
		} else if ( tagname === 'div' ) {
			this.inDiv = false;
		}
	}

	private processData( text: string ): boolean {
		text = text.trim();
		if ( text.length == 0 ) {
			return false;
		}
		// 2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős,
		// Kivitelező - napijelentésre jogosult, Építési műszaki ellenőr (Építészet))
		const splitter = new NaploStringSplitter( text );
		const roles = splitter.parenthesedEnd();

		text = splitter.rest;
		const regex = /^([0-9\-/]+) (.+)\s*$/;
		const matches = regex.exec( text );

		if ( roles == null || matches == null || matches.length != 3 ) {
			throw new SyntaxError( 'Unparseable naplo data: \'' + text + '\'' );
		}

		let index = 1;
		this.item.azonosito = matches[ index++ ];
		this.item.nev = matches[ index++ ];

		for ( let role of roles.split( ', ' ) ) {
			let szakag = null;
			const startParenthesis = role.indexOf( ' (' );
			if ( startParenthesis >= 0 ) {
				szakag = role.substring( startParenthesis + 2, role.length - 1 );
				role = role.substring( 0, startParenthesis );
			}
			this.item.szerepkorok.push( new Szerepkor( role, szakag ) );
		}

		this.item = null;

		return true;
	}

	public getData(): Array<Fonaplo> {
		return this.items;
	}
}

export class FonaploParser extends BaseHtmlParser<FonaploParser> {
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

