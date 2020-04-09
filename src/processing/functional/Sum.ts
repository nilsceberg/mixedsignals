import { FunctionInput, FunctionOutput } from "../../signals/Generator";
import { observable } from "mobx";
import { System } from "../System";

export class Sum extends System {
	public readonly a: FunctionInput;
	public readonly b: FunctionInput;
	public readonly sum: FunctionOutput;

	@observable
	public aw: number = 1;

	@observable
	public bw: number = 1;

	constructor(config?: any) {
		super();

		if (config) {
			this.aw = config.aw;
			this.bw = config.bw;
		}

		this.a = new FunctionInput();
		this.b = new FunctionInput();
		this.sum = new FunctionOutput(t => this.aw * this.a.sample(t) + this.bw * this.b.sample(t));
	}

	public serialize() {
		return {
			_: "su",
			aw: this.aw,
			bw: this.bw,
		};
	}
}

