import { FunctionOutput } from "../../signals/Generator";

import { observable } from "mobx";
import { System } from "../System";

export class Constant extends System {
	public readonly constant: FunctionOutput;

	@observable
	public value: number = 0;

	constructor() {
		super();
		this.constant = new FunctionOutput(
			t => this.value
		);
	}

	public serialize() {
		return {
			v: this.value,
		};
	}
}

