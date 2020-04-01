import { AnalogInput, AnalogOutput } from "../../signals/Analog";
import { observable } from "mobx";
import { DigitalInput, DigitalOutput } from "../../signals/Digital";

export class AnalogSum {
	public readonly a: DigitalInput;
	public readonly b: DigitalInput;
	public readonly sum: AnalogOutput;

	@observable
	public aw: number = 1;

	@observable
	public bw: number = 1;

	@observable
	public clock: "a" | "b" = "a";

	private av: number = 0;
	private bv: number = 0;

	constructor() {
		this.a = new DigitalOutput();
		this.b = new AnalogInput();
		this.sum = new AnalogOutput(() => this.aw * this.a.sample() + this.bw * this.b.sample());
	}

}
