import { FunctionInput, FunctionOutput } from "../../signals/Generator";
import { observable } from "mobx";
import { System } from "../System";
import { DiscreteOutput } from "../../signals/Discrete";

export class Sampler extends System {
	public readonly function: FunctionInput;
	public readonly discrete: DiscreteOutput;
	public readonly meta_freq: FunctionOutput;

	@observable
	public frequency: number = 1;

	@observable
	public lastSample: number = 0;

	public t: number = 0;

	constructor() {
		super();

		this.function = new FunctionInput();
		this.discrete = new DiscreteOutput(async () => {
			const sample = this.function.sample(this.t);
			let step = 1.0 / this.frequency;
			if (isNaN(step)) {
				step = 0;
			}

			this.t += step;
			return sample;
		});
		this.meta_freq = new FunctionOutput(() => this.frequency);
	}

	public serialize() {
		return {
			frequency: this.frequency,
		};
	}
}
