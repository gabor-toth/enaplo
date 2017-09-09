export class ApiResponse {
	public type: string;
	public data?: any;
	public url?: string;

	public static proxy( url: string ): ApiResponse {
		const response = new ApiResponse();
		response.type = 'proxy';
		response.url = url;
		return response;
	}

	public static data( data: any ): ApiResponse {
		const response = new ApiResponse();
		response.type = 'data';
		response.data = data;
		return response;
	}
}
