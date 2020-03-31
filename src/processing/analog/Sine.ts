import { AnalogOutput } from "../../signals/Analog";

import { observable } from "mobx";

export class Sine {
	public readonly output: AnalogOutput;

	@observable
	public frequency: number = 1;

	@observable
	public amplitude: number = 1;

	@observable
	public phase: number = 0;

	constructor() {
		this.output = new AnalogOutput(
			t => this.amplitude * Math.sin(2.0 * Math.PI * this.frequency * t + this.phase)
		);
	}
}
