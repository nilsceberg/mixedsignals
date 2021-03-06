import { FunctionOutput } from "../../signals/Generator";

import { observable } from "mobx";
import { System } from "../System";

export class Constant extends System {
	public readonly constant: FunctionOutput;

	@observable
	public value: number = 0;

	constructor(config?: any) {
		super();

		if (config) {
			this.value = config.v;
		}

		this.constant = new FunctionOutput(
			t => this.value
		);
	}

	public serialize() {
		return {
			_: "c",
			v: this.value,
		};
	}
}

