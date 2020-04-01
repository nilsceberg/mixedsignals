import { observable } from "mobx";
import { DigitalInput, DigitalOutput } from "../../signals/Digital";

export class Relay {
	public readonly input: DigitalInput;
	public readonly output: DigitalOutput;

	constructor() {
		this.output = new DigitalOutput();
		this.input = new DigitalInput(x => {
			this.output.write(x);
		});
	}
}
