
export interface ServiceCallStateObserver {
	onServiceCallStart(): void;
	onServiceCallEnd(): void;
}
