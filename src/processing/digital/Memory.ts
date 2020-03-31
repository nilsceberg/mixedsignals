import { observable, action } from "mobx";
import { DigitalInput, BufferOutput, SignalBuffer } from "../../signals/Digital";

export class Memory {
	public readonly input: DigitalInput;
	public readonly buffer: BufferOutput;

	@observable
	public length: number;

	@observable
	public memory: number[] = [];

	constructor(length: number) {
		this.length = length;
		
		for (let i=0; i<length; ++i) {
			this.memory.push(0);
		}

		this.buffer = new BufferOutput();
		this.input = new DigitalInput(action((x: number) => {
			this.memory.shift();
			this.memory.push(x);
			this.buffer.write({
				samples: this.memory,
				length: this.length,
			});
		}));
	}
}
