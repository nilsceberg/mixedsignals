import { Input, Output } from "./IO";

export type DiscreteFunction = (consumer: string) => Promise<number>;

export class DiscreteOutput implements Output {
	private f: DiscreteFunction;
	private next: Promise<number> | null;
	private lastConsumer: string = "";
	private lastSample: number = 0;

	constructor(f: DiscreteFunction) {
		this.f = f;
		this.next = null;
	}

	private async evaluate(consumer: string): Promise<number> {
		let s = await this.f(consumer);
		if (isNaN(s)) {
			return 0;
		}
		else {
			return s;
		}
	}

	async read(consumer: string): Promise<number> {
		if (this.next) {
			return await this.next;
		}
		// If there is no promise but your consumer ID (unique for every evaluation)
		// matches the already evaluated one, help yourself to that value!
		else if (consumer === this.lastConsumer) {
			return this.lastSample;
		}

		this.next = this.evaluate(consumer);
		const s = await this.next;
		this.lastSample = s;
		this.lastConsumer = consumer;
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

	public async read(consumer: string): Promise<number> {
		if (this.remote !== null) {
			return this.remote.read(consumer);
		}
		else {
			return 0;
		}
	}

	public isConnected(): boolean {
		return this.remote !== null;
	}
}
