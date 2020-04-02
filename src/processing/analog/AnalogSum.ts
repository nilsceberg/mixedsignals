import { AnalogInput, AnalogOutput } from "../../signals/Analog";
import { observable } from "mobx";
import { System } from "../System";

export class AnalogSum extends System {
	public readonly a: AnalogInput;
	public readonly b: AnalogInput;
	public readonly sum: AnalogOutput;

	@observable
	public aw: number = 1;

	@observable
	public bw: number = 1;

	constructor() {
		super();
		this.a = new AnalogInput();
		this.b = new AnalogInput();
		this.sum = new AnalogOutput(() => this.aw * this.a.sample() + this.bw * this.b.sample());
	}

}

