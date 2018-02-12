import { BaseDataRouter } from '../base-data-router';
import { BaseDataRouterHandler } from '../base-data-router-handler';

export class NapiJelentesHandler extends BaseDataRouterHandler<NapiJelentesHandler> {
	public get(): void {
		const id = this.request.params.id;
		super.getById( id );
	}
}
