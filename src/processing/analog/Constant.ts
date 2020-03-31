import { AnalogOutput } from "../../signals/Analog";

import { observable } from "mobx";

export class Constant {
	public readonly constant: AnalogOutput;

	@observable
	public value: number = 0;

	constructor() {
		this.constant = new AnalogOutput(
			t => this.value
		);
	}
}

