import { observable } from "mobx";
import { DigitalInput, BufferOutput, BufferInput } from "../../signals/Digital";

export class Graph {
	public readonly buffer: BufferInput;

	@observable
	public samples: number[] = [];

	constructor() {
		this.buffer = new BufferInput(buffer => this.samples = buffer.samples);
	}
}
