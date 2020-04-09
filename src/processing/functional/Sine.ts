import { FunctionOutput } from "../../signals/Generator";

import { observable } from "mobx";
import { System } from "../System";

export class Sine extends System {
	public readonly signal: FunctionOutput;

	@observable
	public frequency: number = 1;

	@observable
	public amplitude: number = 1;

	@observable
	public phase: number = 0;

	constructor(config?: any) {
		super();

		if (config) {
			this.frequency = config.f;
			this.amplitude = config.a;
			this.phase = config.p;
		}

		this.signal = new FunctionOutput(
			t => this.amplitude * Math.sin(2.0 * Math.PI * this.frequency * t + this.phase)
		);
	}

	public serialize() {
		return {
			_: "s",
			f: this.frequency,
			a: this.amplitude,
			p: this.phase,
		};
	}
}
