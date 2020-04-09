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
	public actualFrequency: number = 1;

	@observable
	public frequencyInput: boolean = false;

	private samplesThisSecond: number = 0;
	private frequencyCounter: NodeJS.Timeout;

	constructor() {
		super();

		this.discrete = new DiscreteInput();
		this.output = new RealTimeOutput();
		this.freq = new FunctionInput();
		this.meta_freq = new FunctionOutput(() => this.frequency);

		const tick = async () => {
			const last = time();

			this.frequencyInput = this.freq.isConnected();
			if (this.frequencyInput) {
				this.frequency = this.freq.sample(0);
			}

			const frequency = this.frequency;

			if (isNaN(frequency) || frequency <= 0.0) {
				setTimeout(tick, 100);
				return;
			}

			if (this.discrete.isConnected()) {
				this.output.write(await this.discrete.read());
			}
			else {
				this.output.write(0);
			}

			this.samplesThisSecond++;

			let timeout = (last + 1.0 / frequency - time()) * 1000.0;
			if (timeout < 0) {
				timeout = 0;
			}

			setTimeout(tick, timeout);
		};

		this.frequencyCounter = setInterval(() => {
			this.actualFrequency = this.samplesThisSecond;
			this.samplesThisSecond = 0;
		}, 1000);

		tick();
	}

	public serialize() {
		return {
			f: this.frequency,
		};
	}
}

