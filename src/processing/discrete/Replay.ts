import { observable } from "mobx";
import { RealTimeInput, BufferOutput, BufferInput } from "../../signals/RealTime";
import { FunctionInput } from "../../signals/Generator";
import { System } from "../System";
import { DiscreteOutput } from "../../signals/Discrete";

export class Replay extends System {
	public readonly buffer: BufferInput;
	public readonly signal: DiscreteOutput;

	@observable
	public samples: number[] = [];

	private i: number = 0;

	constructor() {
		super();

		this.buffer = new BufferInput(b => {
			this.samples = b.samples;
		});

		this.signal = new DiscreteOutput(async () => {
			this.i = this.i % this.samples.length;
			const sample = this.samples[this.i];
			this.i++;
			return sample;
		});
	}

	public reset() {
		this.i = 0;
	}

	public serialize() {
		return {
			_: "rp",
		};
	}
}

