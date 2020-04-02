import { observable } from "mobx";
import { DigitalInput, DigitalOutput } from "../../signals/Digital";
import { System } from "../System";

export class Relay extends System {
	public readonly input: DigitalInput;
	public readonly output: DigitalOutput;

	constructor() {
		super();

		this.output = new DigitalOutput();
		this.input = new DigitalInput(x => {
			this.output.write(x);
		});
	}
}
