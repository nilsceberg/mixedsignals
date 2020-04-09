import { observable, action } from "mobx";
import { RealTimeInput, BufferOutput, SignalBuffer } from "../../signals/RealTime";
import { System } from "../System";
import { DiscreteInput } from "../../signals/Discrete";

export class Memory extends System {
	public readonly input: DiscreteInput;
	public readonly buffer: BufferOutput;

	@observable
	public length: number;

	public memory: number[] = [];

	constructor(config?: any) {
		super();

		this.length = 20;

		if (config) {
			this.length = config.l;
		}
		
		for (let i=0; i<this.length; ++i) {
			this.memory.push(0);
		}

		this.input = new DiscreteInput();
		this.buffer = new BufferOutput();
	}

	public async fill() {
		this.memory = [];
		for (let i=0; i<this.length; ++i) {
			this.memory.push(await this.input.read());
		}

		this.buffer.write({
			length: this.length,
			samples: this.memory,
		});
	}

	public serialize() {
		return {
			_: "m",
			l: this.length,
		};
	}
}
