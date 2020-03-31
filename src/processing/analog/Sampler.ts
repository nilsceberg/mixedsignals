import { AnalogInput } from "../../signals/Analog";
import { observable } from "mobx";

export class Sampler {
	public readonly analog: AnalogInput;

	@observable
	public frequency: number = 1;

	@observable
	public lastSample: number = 0;

	constructor() {
		this.analog = new AnalogInput();

		const sample = () => {
			if (this.frequency === 0 || isNaN(this.frequency)) {
				setTimeout(sample, 500);
				return;
			}

			this.lastSample = this.analog.sample();
			setTimeout(sample, 1.0 / this.frequency * 1000.0);
		}

		sample();
	}

}
