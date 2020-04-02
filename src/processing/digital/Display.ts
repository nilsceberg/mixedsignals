import { observable } from "mobx";
import { DigitalInput } from "../../signals/Digital";
import { System } from "../System";

export class Display extends System {
	public readonly signal: DigitalInput;

	@observable
	public last: number = 0;

	constructor() {
		super();
		this.signal = new DigitalInput(x => this.last = x);
	}
}
