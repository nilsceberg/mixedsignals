import { observable } from "mobx";
import { DigitalInput, BufferOutput, BufferInput } from "../../signals/Digital";
import { AnalogInput } from "../../signals/Analog";
import { System } from "../System";

export class RealtimeVisualizer extends System {
	public readonly length: AnalogInput;
	public readonly input: DigitalInput;

	@observable
	public currentLength: number = 1;

	@observable
	public samples: number[] = [];

	private i: number = 0;

	private updateLength(length: number) {
		length = Math.floor(length);

		if (this.currentLength < length) {
			for (let i = this.currentLength; i < length; ++i) {
				this.samples.push(0);
			}
		}
		else if (this.currentLength > length) {
			this.samples.splice(length);
		}
		this.currentLength = length;
	}

	constructor() {
		super();

		this.length = new AnalogInput();

		this.updateLength(this.currentLength);

		this.input = new DigitalInput(x => {
			this.updateLength(this.length.sample());

			if (this.currentLength === 0) {
				return;
			}

			this.i = this.i % this.currentLength;
			this.samples[this.i++] = x;
		});
	}
}
