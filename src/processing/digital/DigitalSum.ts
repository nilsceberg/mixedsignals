import { AnalogInput, AnalogOutput } from "../../signals/Analog";
import { observable } from "mobx";
import { DigitalInput, DigitalOutput } from "../../signals/Digital";
import { System } from "../System";

export class DigitalSum extends System {
	public readonly a: DigitalInput;
	public readonly b: DigitalInput;
	public readonly sum: DigitalOutput;

	@observable
	public aw: number = 1;

	@observable
	public bw: number = 1;

	@observable
	public clock: "a" | "b" = "a";

	private av: number = 0;
	private bv: number = 0;

	constructor() {
		super();

		this.sum = new DigitalOutput();

		this.a = new DigitalInput(x => {
			this.av = x;
			if (this.clock === "a") {
				this.sum.write(this.aw * this.av + this.bw * this.bv);
			}
		});

		this.b = new DigitalInput(x => {
			this.bv = x;
			if (this.clock === "b") {
				this.sum.write(this.aw * this.av + this.bw * this.bv);
			}
		});
	}

}
