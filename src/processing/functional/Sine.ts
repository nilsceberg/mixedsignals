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

	constructor() {
		super();
		this.signal = new FunctionOutput(
			t => this.amplitude * Math.sin(2.0 * Math.PI * this.frequency * t + this.phase)
		);
	}

	public serialize() {
		return {
			frequency: this.frequency,
			amplitude: this.amplitude,
			phase: this.phase,
		};
	}
}
