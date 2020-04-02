import { observable } from "mobx";
import { DigitalInput, BufferOutput, BufferInput } from "../../signals/Digital";
import { System } from "../System";

export class Graph extends System {
	public readonly buffer: BufferInput;

	@observable
	public samples: number[] = [];

	constructor() {
		super();
		this.buffer = new BufferInput(buffer => this.samples = buffer.samples);
	}
}
