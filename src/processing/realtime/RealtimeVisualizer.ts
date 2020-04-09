import { observable, action } from "mobx";
import { RealTimeInput, BufferOutput, BufferInput } from "../../signals/RealTime";
import { FunctionInput } from "../../signals/Generator";
import { System } from "../System";

export class RealtimeVisualizer extends System {
	public readonly length: FunctionInput;
	public readonly input: RealTimeInput;

	@observable
	public currentLength: number = 1;

	@observable
	public samples: number[] = [];

	@observable
	public step: number = 1;

	private i: number = 0;
	private skip: number;

	@action
	private updateLength(length: number) {
		length = Math.floor(length);

		if (this.currentLength < length) {
			const newSamples = new Array(this.currentLength);
			for (let i = this.currentLength; i < length; ++i) {
				newSamples[i] = 0;
			}
			this.samples = newSamples;
		}
		else if (this.currentLength > length) {
			this.samples.splice(length);
		}
		this.currentLength = length;
	}

	constructor(config?: any) {
		super();
		this.length = new FunctionInput();
		
		if (config) {
			this.step = config.s;
		}
		this.skip = this.step;

		this.updateLength(this.currentLength);

		this.input = new RealTimeInput(action(x => {
			if (this.step < this.skip) {
				this.skip = this.step;
			}

			if (--this.skip > 0) {
				return;
			}

			this.skip = this.step;
			this.updateLength(this.length.sample(0));

			this.i = this.i % this.currentLength;
			this.samples[this.i++] = x;
		}));
	}

	public serialize() {
		return {
			_: "rtv",
			s: this.step,
		};
	}
}
