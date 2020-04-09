import { observable } from "mobx";
import { System } from "../System";
import { DiscreteInput, DiscreteOutput } from "../../signals/Discrete";

export class DiscreteSum extends System {
	public readonly a: DiscreteInput;
	public readonly b: DiscreteInput;
	public readonly sum: DiscreteOutput;

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

		this.a = new DiscreteInput();
		this.b = new DiscreteInput();

		this.sum = new DiscreteOutput(
			async () => this.aw * (await this.a.read()) + this.bw * (await this.b.read())
		);
	}

	public serialize() {
		return {
			_: "ds",
			aw: this.aw,
			bw: this.bw,
		};
	}
}
