import { observable } from "mobx";
import { RealTimeInput, BufferOutput, BufferInput } from "../../signals/RealTime";
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
