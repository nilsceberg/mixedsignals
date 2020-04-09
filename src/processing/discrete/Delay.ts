import { observable } from "mobx";
import { System } from "../System";
import { DiscreteInput, DiscreteOutput } from "../../signals/Discrete";

export class Delay extends System {
	public readonly input: DiscreteInput;
	public readonly output: DiscreteOutput;

	private next: number = 0;

	constructor() {
		super();
		this.input = new DiscreteInput();
		this.output = new DiscreteOutput(async () => {
			this.input.read().then(x => {
				this.next = x;
			});
			return this.next;
		});
	}

	public serialize() {
		return {
			_: "d"
		};
	}
}
