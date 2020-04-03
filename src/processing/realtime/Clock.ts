import { FunctionInput, FunctionOutput } from "../../signals/Generator";
import { observable } from "mobx";
import { System } from "../System";
import { DiscreteOutput, DiscreteInput } from "../../signals/Discrete";
import { RealTimeOutput } from "../../signals/RealTime";
import { time } from "../util";

export class Clock extends System {
	public readonly discrete: DiscreteInput;
	public readonly output: RealTimeOutput;
	public readonly meta_freq: FunctionOutput;
	public readonly freq: FunctionInput;

	@observable
	public frequency: number = 1;

	@observable
	public frequencyInput: boolean = false;

	constructor() {
		super();

		this.discrete = new DiscreteInput();
		this.output = new RealTimeOutput();
		this.freq = new FunctionInput();
		this.meta_freq = new FunctionOutput(() => this.frequency);

		const tick = () => {
			const last = time();

			this.frequencyInput = this.freq.isConnected();
			if (this.frequencyInput) {
				this.frequency = this.freq.sample(0);
			}

			if (this.discrete.isConnected()) {
				this.output.write(this.discrete.read());
			}
			else {
				this.output.write(0);
			}

			if (isNaN(this.frequency) || this.frequency <= 0.0) {
				setInterval(tick, 100);
				return;
			}

			let timeout = (last + 1.0 / this.frequency * 1000.0) - time();
			if (timeout < 0) {
				timeout = 0;
			}

			setTimeout(tick, timeout);
		};

		tick();
	}
}

