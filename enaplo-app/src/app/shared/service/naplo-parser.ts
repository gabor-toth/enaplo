import { BaseParser, Handler } from '../base-parser';
import { Naplo, Szemely } from '../model/naplo-model';

class NaploCollector implements Handler {
	private items: Naplo[];
	private inStrong: boolean;
	private item: Naplo;

	constructor() {
		this.items = [];
	}

	public onopentag( tagname: string, attributes: { [ type: string ]: string } ): void {
		if ( tagname === 'div' ) {
			this.item = new Naplo();
			this.item.sorszam = attributes.azon;
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
		const regex = /^([0-9/]+) (.+): (.+) (.+) HRSZ:(.+) \((.+) - ([0-9]+)\)$/;
		const matches = regex.exec( text );
		if ( matches == null || matches.length != 8 ) {
			throw new SyntaxError( 'Unparseable naplo data: \'' + text + '\'' );
		}

		let index = 1;
		this.item.azonosito = matches[ index++ ];
		this.item.nev = matches[ index++ ];
		this.item.iranyitoszam = matches[ index++ ];
		this.item.telepules = matches[ index++ ];
		this.item.helyrajziszam = matches[ index++ ];
		this.item.tulajdonos = new Szemely();
		this.item.tulajdonos.nev = matches[ index++ ];
		this.item.tulajdonos.nuj = matches[ index++ ];

		this.items.push( this.item );
		this.item = null;
	}

	public getData(): Naplo[] {
		return this.items;
	}
}

export class NaploParser extends BaseParser {
	public parse(): Naplo[] {
		this.skip( '$(\'#enaploAktaFa\').html(' );
		const html = this.readString();
		const collector = new NaploCollector();
		this.parseHtml( html, collector );
		return collector.getData();
	}
}

