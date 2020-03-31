import * as uuid from "uuid";
import { Input, Output } from "./IO";

type PushProcess<T> = (t: T) => void;

class PushOutput<T> implements Output {
	private connected: { [id: string]: PushProcess<T> } = {};

	public _registerInput(id: string, process: PushProcess<T>) {
		this.connected[id] = process;
	}

	public _deregisterInput(id: string) {
		delete this.connected[id];
	}

	public write(x: T) {
		for (const id in this.connected) {
			this.connected[id](x);
		}
	}
}

class PushInput<T> implements Input<PushOutput<T>> {
	private remote: PushOutput<T> | null = null;
	private process: PushProcess<T>;
	private id: string = uuid.v4();

	constructor(process: PushProcess<T>) {
		this.process = process;
		this.remote = null;
	}

	public connect(remote: PushOutput<T> | null) {
		if (this.remote) {
			this.remote._deregisterInput(this.id);
		}

		this.remote = remote;

		if (remote) {
			remote._registerInput(this.id, this.process);
		}
	}

	public getRemote(): PushOutput<T> | null {
		return this.remote;
	}
}

export type DigitalProcess = PushProcess<number>;
export class DigitalOutput extends PushOutput<number> {};
export class DigitalInput extends PushInput<number> {};

export interface SignalBuffer {
	samples: number[];
	length: number;
}
export type BufferProcess = PushProcess<SignalBuffer>;
export class BufferOutput extends PushOutput<SignalBuffer> {};
export class BufferInput extends PushInput<SignalBuffer> {};

