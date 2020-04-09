import { Input, Output } from "./IO";

export type DiscreteFunction = () => Promise<number>;

export class DiscreteOutput implements Output {
	private f: DiscreteFunction;
	private next: Promise<number> | null;

	constructor(f: DiscreteFunction) {
		this.f = f;
		this.next = null;
	}

	private async evaluate(): Promise<number> {
		let s = await this.f();
		if (isNaN(s)) {
			return 0;
		}
		else {
			return s;
		}
	}

	async read(): Promise<number> {
		if (this.next) {
			return await this.next;
		}

		this.next = this.evaluate();
		const s = await this.next;
		this.next = null;
		return s;
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

	public async read(): Promise<number> {
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
