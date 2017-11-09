import * as slashes from 'slashes';
import { Parser, Handler, Options } from 'htmlparser2';

export { Handler } from 'htmlparser2';

export abstract class BaseParser<T extends BaseParser<T>> {
	protected data: string;
	protected length: number;

	constructor() {
	}

	public setData( data: string ): T {
		this.data = data;
		this.length = data.length;
		return this as any as T;
	}

	public abstract parse(): any;

}

