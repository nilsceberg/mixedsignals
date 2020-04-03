import { observable } from "mobx";
import { RealTimeInput, RealTimeOutput } from "../../signals/RealTime";
import { System } from "../System";

export class Delay extends System {
	public readonly input: RealTimeInput;
	public readonly output: RealTimeOutput;

	private previous: number = 0;

	constructor() {
		super();
		this.output = new RealTimeOutput();
		this.input = new RealTimeInput(x => {
			this.output.write(this.previous);
			this.previous = x;
		});
	}
}
