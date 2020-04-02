import { AnalogInput, AnalogOutput } from "../../signals/Analog";
import { DigitalOutput } from "../../signals/Digital";
import { observable } from "mobx";
import { System } from "../System";

export class Sampler extends System {
	public readonly analog: AnalogInput;
	public readonly digital: DigitalOutput;
	public readonly meta_freq: AnalogOutput;

	@observable
	public frequency: number = 1;

	@observable
	public lastSample: number = 0;

	constructor() {
		super();

		this.analog = new AnalogInput();
		this.digital = new DigitalOutput();
		this.meta_freq = new AnalogOutput(() => this.frequency);

		const sample = () => {
			if (this.frequency === 0 || isNaN(this.frequency)) {
				setTimeout(sample, 500);
				return;
			}

			this.lastSample = this.analog.sample();
			this.digital.write(this.lastSample);

			setTimeout(sample, 1.0 / this.frequency * 1000.0);
		}

		sample();
	}

}
