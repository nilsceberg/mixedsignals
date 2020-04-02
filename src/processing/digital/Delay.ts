import { observable } from "mobx";
import { DigitalInput, DigitalOutput } from "../../signals/Digital";
import { System } from "../System";

export class Delay extends System {
	public readonly input: DigitalInput;
	public readonly output: DigitalOutput;

	private previous: number = 0;

	constructor() {
		super();
		this.output = new DigitalOutput();
		this.input = new DigitalInput(x => {
			this.output.write(this.previous);
			this.previous = x;
		});
	}
}
