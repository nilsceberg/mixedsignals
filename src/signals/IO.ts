export interface Output {
}

export interface Input<Out> {
	connect(remote: Out | null): void;
	getRemote(): Out | null;
	isConnected(): boolean;
}