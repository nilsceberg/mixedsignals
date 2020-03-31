import { AnalogInput } from "../../signals/Analog";
import { observable } from "mobx";

export class Sampler {
	public readonly input: AnalogInput;

	@observable
	public frequency: number = 1;

	constructor() {
		this.input = new AnalogInput();

		const sample = () => {
			if (this.frequency === 0 || isNaN(this.frequency)) {
				setTimeout(sample, 500);
				return;
			}

			console.log("Sample: " + this.input.sample());
			setTimeout(sample, 1.0 / this.frequency * 1000.0);
		}

		sample();
	}

}
