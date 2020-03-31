import { time } from "../processing/util";

export type AnalogProcess = (t: number) => number;

export class AnalogOutput {
	private process: AnalogProcess;

	constructor(process: AnalogProcess) {
		this.process = process;
	}

	sample(): number {
		return this.process(time());
	}
}

export class AnalogInput {
	private remote: AnalogOutput | null = null;

	constructor(remote?: AnalogOutput) {
		this.remote = remote || null;
	}

	connect(remote: AnalogOutput | null): void {
		this.remote = remote;
	}

	sample(): number {
		if (this.remote !== null) {
			return this.remote.sample();
		}
		else {
			return 0;
		}
	}
}
