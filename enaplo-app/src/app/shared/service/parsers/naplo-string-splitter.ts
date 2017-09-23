export class NaploStringSplitter {
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

