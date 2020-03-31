import { observable } from "mobx";
import { DigitalInput } from "../../signals/Digital";

export class Memory {
	//public readonly signal: DigitalInput;

	@observable
	public length: number = 0;

	@observable
	public buffer: number[] = [];

	constructor() {
		//this.signal = new DigitalInput();
	}

}

