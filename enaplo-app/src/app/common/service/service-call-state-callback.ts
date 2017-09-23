
export interface ServiceCallStateObserver {
	onServiceCallStart(): void;
	onServiceCallProgress( percent: number ): void;
	onServiceCallEnd(): void;
}
