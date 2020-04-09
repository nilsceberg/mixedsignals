import { observable } from "mobx";
import { RealTimeInput, RealTimeOutput } from "../../signals/RealTime";
import { System } from "../System";

export class Relay extends System {
	public readonly input: RealTimeInput;
	public readonly output: RealTimeOutput;

	constructor() {
		super();

		this.output = new RealTimeOutput();
		this.input = new RealTimeInput(x => {
			this.output.write(x);
		});
	}

	public serialize() {
		return {
			_: "r"
		};
	}
}
