import * as uuid from "uuid";
import { Input, Output } from "./IO";

type PushProcess<T> = (t: T) => void;

class PushOutput<T> implements Output {
	private connected: { [id: string]: PushProcess<T> } = {};

	public _registerInput(id: string, process: PushProcess<T>) {
		this.connected[id] = process;
	}

	public _deregisterInput(id: string): PushProcess<T> | undefined {
		const process = this.connected[id];
		if (process !== undefined) {
			delete this.connected[id];
		}
		return process;
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

	public isConnected(): boolean {
		return this.remote !== null;
	}
}

export type RealTimeProcess = PushProcess<number>;
export class RealTimeOutput extends PushOutput<number> {};
export class RealTimeInput extends PushInput<number> {};


/**
 * This one differs slightly from the real-time signal type,
 * but its implementation is similar.
 * 
 * This is basically just the observer pattern with the extra
 * perks that the process function is also called on connect
 * and disconnect, as opposed to the real-time signal which is
 * more of a stream kind of thing - miss a value and it's gone.
 * The buffer signal type instead has a current value and notifies
 * its subscribers when it changes.
 */
export interface SignalBuffer {
	samples: number[];
	length: number;
}
export type BufferProcess = PushProcess<SignalBuffer>;

export class BufferOutput extends PushOutput<SignalBuffer> {
	private current: SignalBuffer = {
		length: 0,
		samples: [],
	};

	public _registerInput(id: string, process: PushProcess<SignalBuffer>) {
		super._registerInput(id, process);
		process(this.current);
	}

	public _deregisterInput(id: string) {
		const process = super._deregisterInput(id);
		if (process) {
			process({
				length: 0,
				samples: [],
			});
		}
		return process;
	}

	public write(x: SignalBuffer) {
		this.current = x;
		super.write(x);
	}
};

export class BufferInput extends PushInput<SignalBuffer> {};

