import * as slashes from 'slashes';
import { Parser, Handler, Options } from 'htmlparser2';

export { Handler } from 'htmlparser2';

export abstract class BaseParser {
	private data: string;
	private position: number;
	private length: number;

	constructor() {
	}

	public setData( data: string ): BaseParser {
		this.data = data;
		this.length = data.length;
		this.position = 0;
		return this;
	}

	public abstract parse(): any;

	protected checkLength( exptectedChars: number ): void {
		if ( this.position + exptectedChars >= this.length ) {
			throw new SyntaxError( 'Expected ' + exptectedChars + ' more characters at position ' + this.position );
		}
	}

	protected skip( exptectedString: string ): void {
		if ( exptectedString != this.data.substr( this.position, exptectedString.length ) ) {
			throw new SyntaxError( 'Expected string not found at position ' + this.position );
		}
		this.position += exptectedString.length;
	}

	protected skipUntil( exptectedString: string ): void {
		const skipToPosition = this.data.indexOf( exptectedString, this.position );
		if ( skipToPosition < 0 ) {
			throw new SyntaxError( 'Expected string not found' );
		}
		this.position = skipToPosition + exptectedString.length;
	}

	protected readString(): string {
		this.checkLength( 1 );
		if ( this.data.charAt( this.position ) != '\'' ) {
			throw new SyntaxError( 'Expected start of string at position ' + this.position );
		}
		this.position++;
		let result = '';
		let escaped = false;
		for ( ; this.position < this.length; this.position++ ) {
			let c = this.data.charAt( this.position );
			if ( c == '\'' && !escaped ) {
				this.position++;
				break;
			}
			if ( c == '\\' ) {
				escaped = true;
				continue;
			}
			if ( escaped ) {
				c = slashes.strip( '\\' + c );
				escaped = false;
			}
			result += c;
		}
		return result;
	}

	protected parseHtml( html: string, handler: Handler, options?: Options ): void {
		options = this.setDefaultOptions( options );

		const parser = new Parser( handler, options );
		parser.write( html );
		parser.end();
	}

	private setDefaultOptions( options?: Options ): Options {
		options = options || {};
		options.decodeEntities = true;
		return options;
	}
}

