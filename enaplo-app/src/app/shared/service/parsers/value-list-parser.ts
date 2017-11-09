import { BaseParser } from '../../base-parser';
import { ValueItem } from '../../model/value-item';

export class ValueListParser extends BaseParser<ValueListParser> {
	public parse(): ValueItem[] {
		const arrayOfLines: string[] = this.data.match( /[^\r\n]+/g );
		const result = new ValueItem[ arrayOfLines.length ];
		for ( let i = 0; i < arrayOfLines.length; i++ ) {
			const parts = arrayOfLines[ i ].split( '|' );
			result[ i ] = new ValueItem( parseInt( parts[ 0 ], 10 ), parts[ 1 ] );
		}
		return result;
	}
}

