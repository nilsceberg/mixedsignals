import { observable, action } from "mobx";
import { RealTimeInput, BufferOutput, SignalBuffer } from "../../signals/RealTime";
import { System } from "../System";

export class Memory extends System {
	public readonly input: RealTimeInput;
	public readonly buffer: BufferOutput;

	@observable
	public length: number;

	@observable
	public memory: number[] = [];

	constructor() {
		super();
		this.length = 20;
		
		for (let i=0; i<this.length; ++i) {
			this.memory.push(0);
		}

		this.buffer = new BufferOutput();
		this.input = new RealTimeInput(action((x: number) => {
			this.memory.shift();
			this.memory.push(x);
			this.buffer.write({
				samples: this.memory.slice(),
				length: this.length,
			});
		}));
	}

	public serialize() {
		return {};
	}
}
