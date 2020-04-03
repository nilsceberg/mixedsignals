import { Input, Output } from "./IO";

export type Next = () => number;

export class DiscreteOutput implements Output {
	private next: Next;

	constructor(next: Next) {
		this.next = next;
	}

	read(): number {
		let s = this.next();
		if (isNaN(s)) {
			return 0;
		}
		else {
			return s;
		}
	}
}

export class DiscreteInput implements Input<DiscreteOutput> {
	private remote: DiscreteOutput | null = null;

	constructor(remote?: DiscreteOutput) {
		this.remote = remote || null;
	}

	connect(remote: DiscreteOutput | null): void {
		this.remote = remote;
	}

	public getRemote(): DiscreteOutput | null {
		return this.remote;
	}

	public read(): number {
		if (this.remote !== null) {
			return this.remote.read();
		}
		else {
			return 0;
		}
	}

	public isConnected(): boolean {
		return this.remote !== null;
	}
}
