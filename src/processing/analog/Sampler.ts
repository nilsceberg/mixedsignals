import { AnalogInput } from "../../signals/Analog";
import { DigitalOutput } from "../../signals/Digital";
import { observable } from "mobx";

export class Sampler {
	public readonly analog: AnalogInput;
	public readonly digital: DigitalOutput;

	@observable
	public frequency: number = 1;

	@observable
	public lastSample: number = 0;

	constructor() {
		this.analog = new AnalogInput();
		this.digital = new DigitalOutput();

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