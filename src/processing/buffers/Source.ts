import { observable, action } from "mobx";
import { RealTimeInput, BufferOutput, SignalBuffer } from "../../signals/RealTime";
import { System } from "../System";
import axios from "axios";

export class Source extends System {
	public readonly buffer: BufferOutput;
	
	@observable
	public url: string = "";

	@observable
	public downloading: boolean = false;

	public data: number[] = [];

	constructor(config?: any) {
		super();

		if (config) {
			this.url = config.u;
		}

		this.buffer = new BufferOutput();

		this.download();
	}

	public async download() {
		if (!this.url) {
			return;
		}

		this.downloading = true;
		try {
			const response = await axios.get(this.url, {
				responseType: "json",
			});
			this.data = response.data as number[];
			console.log("Retrieved data: ", this.data.length);
		} catch(e) {
			// TODO: present an actual error
			console.log("There was an error :(");
		}
		this.downloading = false;

		this.buffer.write({
			length: this.data.length,
			samples: this.data,
		});
	}

	public serialize() {
		return {
			_: "src",
			u: this.url,
		};
	}
}

