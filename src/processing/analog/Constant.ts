import { AnalogOutput } from "../../signals/Analog";

import { observable } from "mobx";
import { System } from "../System";

export class Constant extends System {
	public readonly constant: AnalogOutput;

	@observable
	public value: number = 0;

	constructor() {
		super();
		this.constant = new AnalogOutput(
			t => this.value
		);
	}
}

