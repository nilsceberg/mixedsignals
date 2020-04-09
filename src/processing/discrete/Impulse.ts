import { observable } from "mobx";
import { System } from "../System";
import { DiscreteOutput } from "../../signals/Discrete";

export class Impulse extends System {
	public readonly output: DiscreteOutput;

	@observable
	public pulse: boolean = false;

	constructor() {
		super();
		this.output = new DiscreteOutput(async () => {
			const sample = this.pulse ? 1 : 0;
			this.pulse = false;
			return sample;
		});
	}
}
