import { observable } from "mobx";
import { DigitalInput } from "../../signals/Digital";

export class Display {
	public readonly signal: DigitalInput;

	@observable
	public last: number = 0;

	constructor() {
		this.signal = new DigitalInput(x => this.last = x);
	}
}
