import * as uuid from "uuid";
import { Input, Output } from "./IO";

export type DigitalProcess = (t: number) => void;

export class DigitalOutput implements Output {
	private connected: { [id: string]: DigitalProcess } = {};

	public _registerInput(id: string, process: DigitalProcess) {
		this.connected[id] = process;
	}

	public _deregisterInput(id: string) {
		delete this.connected[id];
	}

	public write(x: number) {
		for (const id in this.connected) {
			this.connected[id](x);
		}
	}
}

export class DigitalInput implements Input<DigitalOutput> {
	private remote: DigitalOutput | null = null;
	private process: (x: number) => void;
	private id: string = uuid.v4();

	constructor(process: DigitalProcess) {
		this.process = process;
		this.remote = null;
	}

	public connect(remote: DigitalOutput | null) {
		if (this.remote) {
			this.remote._deregisterInput(this.id);
		}

		this.remote = remote;

		if (remote) {
			remote._registerInput(this.id, this.process);
		}
	}

	public getRemote(): DigitalOutput | null {
		return this.remote;
	}
}
