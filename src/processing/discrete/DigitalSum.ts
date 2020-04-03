import { FunctionInput, FunctionOutput } from "../../signals/Generator";
import { observable } from "mobx";
import { RealTimeInput, RealTimeOutput } from "../../signals/RealTime";
import { System } from "../System";

export class DigitalSum extends System {
	public readonly a: RealTimeInput;
	public readonly b: RealTimeInput;
	public readonly sum: RealTimeOutput;

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

		this.sum = new RealTimeOutput();

		this.a = new RealTimeInput(x => {
			this.av = x;
			if (this.clock === "a") {
				this.sum.write(this.aw * this.av + this.bw * this.bv);
			}
		});

		this.b = new RealTimeInput(x => {
			this.bv = x;
			if (this.clock === "b") {
				this.sum.write(this.aw * this.av + this.bw * this.bv);
			}
		});
	}

}
