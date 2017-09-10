import { Component, OnInit } from '@angular/core';

export class BaseComponent {
	protected loading = true;
	protected errorLoading = false;

	onServiceError( error: any ): void {
		this.loading = false;
		this.errorLoading = true;
		console.log( 'Promise rejected' );
		console.log( error );
	}

	onServiceSuccess(): void {
		this.loading = false;
	}
}
