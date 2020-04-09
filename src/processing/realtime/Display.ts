import { observable, action } from "mobx";
import { RealTimeInput } from "../../signals/RealTime";
import { System } from "../System";

export class Display extends System {
	public readonly signal: RealTimeInput;

	@observable
	public last: number = 0;

	constructor() {
		super();
		this.signal = new RealTimeInput(x => this.last = x);
	}

	public serialize() {
		return {
			_: "di",
		};
	}
}
