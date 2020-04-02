import { AnalogOutput } from "../../signals/Analog";

import { observable } from "mobx";
import { System } from "../System";

export class Sine extends System {
	public readonly signal: AnalogOutput;

	@observable
	public frequency: number = 1;

	@observable
	public amplitude: number = 1;

	@observable
	public phase: number = 0;

	constructor() {
		super();
		this.signal = new AnalogOutput(
			t => this.amplitude * Math.sin(2.0 * Math.PI * this.frequency * t + this.phase)
		);
	}
}
