import { BaseHtmlParser, Handler } from '../../base-html-parser';
import { ValueListsService } from '../../export';
import { NapiJelentes } from '../../model/napi-jelentes-model';
import { Naplo, Szemely } from '../../model/naplo-model';

// bejegyzesKartonInit(1,'2018.02.12.','-3','-1','','Teljes szélcsend','Dél (D)','Erősen felhős','Hó','egyéb','1','08:00','14:00','hétfő',{napijelentes:true,napi_bejegyzes:true});
// replaceTableContent('table_bejegyzesek','<tr class=\'emptytable\'><td colspan=\'6\'>Nincs rögzített adat...</td></tr>','');
// replaceTableContent('table_letszam','<tr class=\'r0\' unique=\'1111\'><td style=\'text-align:left;\'>Adminisztratív</td><td style=\'text-align:left;\'>megj</td>
//    <td style=\'text-align:right;\'>1</td></tr><tr class=\'nopointer\' unique=\'null\'><td style=\'text-align:left;\'> </td><td style=\'text-align:right;\'><strong>összesen<strong></td><td style=\'text-align:right;\'><strong>1<strong></td></tr>','');
// replaceTableContent('table_letszam_alvallakozoi','<tr class=\'emptytable\'><td colspan=\'3\'>Nincs rögzített adat...</td></tr>','');

class NapiJelentesCollector implements Handler {
	private item: NapiJelentes;
	private inStrong: boolean;

	constructor( item: NapiJelentes ) {
		this.item = item;
	}

	public onopentag( tagname: string, attributes: { [ type: string ]: string } ): void {
		if ( tagname === 'div' ) {
			this.item = new NapiJelentes();
			// this.item.sorszam = attributes.azon;
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
		/*
		this.item.azonosito = matches[ index++ ];
		this.item.nev = matches[ index++ ];
		this.item.iranyitoszam = matches[ index++ ];
		this.item.telepules = matches[ index++ ];
		this.item.helyrajziszam = matches[ index++ ];
		this.item.tulajdonos = new Szemely();
		this.item.tulajdonos.nev = matches[ index++ ];
		this.item.tulajdonos.nuj = matches[ index++ ];
		*/
	}

	public getData(): NapiJelentes {
		return this.item;
	}
}

export class NapiJelentesParser extends BaseHtmlParser<NapiJelentesParser> {
	constructor( private valueListsService: ValueListsService ) {
		super();
	}

	public parse(): NapiJelentes {
		const fields = this.match( '[^\\(]*\\(([^,]*),\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',\'(.*)\',{napijelentes:(.*),napi_bejegyzes:(.*)}\\)' );
		const data = new NapiJelentes(); // new NapiJelentes( fields, valueListsService );
		// const collector = new NapiJelentesCollector();

		this.skip( ';replaceTableContent(\'table_bejegyzesek\',\'' );
		let html = this.readString();
		// this.parseHtml( html, collector );

		this.skip( ';replaceTableContent(\'table_letszam\',\'' );
		html = this.readString();
		// this.parseHtml( html, collector );

		this.skip( ';replaceTableContent(\'table_letszam_alvallakozoi\',\'' );
		html = this.readString();

		return data;
	}
}
