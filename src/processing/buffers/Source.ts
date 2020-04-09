import { observable, action } from "mobx";
import { RealTimeInput, BufferOutput, SignalBuffer } from "../../signals/RealTime";
import { System } from "../System";
import { DiscreteInput } from "../../signals/Discrete";

export class Source extends System {
	public readonly buffer: BufferOutput;
	
	@observable
	public url: string | null = null;

	public data: number[] = [];

	constructor(config?: any) {
		super();

		if (config) {
			this.url = config.l;
		}

		this.buffer = new BufferOutput();
	}

	public async download() {
	}

	public serialize() {
		return {
			_: "src",
			u: this.url,
		};
	}
}

