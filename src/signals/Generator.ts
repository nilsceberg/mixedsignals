import { time } from "../processing/util";
import { Input, Output } from "./IO";

export type Generator = (t: number) => number;

export class FunctionOutput implements Output {
	private process: Generator;

	constructor(process: Generator) {
		this.process = process;
	}

	sample(t: number): number {
		let s = this.process(t);
		if (isNaN(s)) {
			return 0;
		}
		else {
			return s;
		}
	}
}

export class FunctionInput implements Input<FunctionOutput> {
	private remote: FunctionOutput | null = null;

	constructor(remote?: FunctionOutput) {
		this.remote = remote || null;
	}

	connect(remote: FunctionOutput | null): void {
		this.remote = remote;
	}

	public getRemote(): FunctionOutput | null {
		return this.remote;
	}

	public sample(t: number): number {
		if (this.remote !== null) {
			return this.remote.sample(t);
		}
		else {
			return 0;
		}
	}

	public isConnected(): boolean {
		return this.remote !== null;
	}
}
