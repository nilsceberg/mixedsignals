import React from "react";

import { Scatter } from "react-chartjs-2";

import { Node } from "../editor/Node";

const linspace = (a: number, b: number, n: number): number[] => {
	const space = [];
	for (let i=0; i<n; ++i) {
		space.push(i / (n - 1) * (b-a) + a);
	}
	return space;
}

export class Visualizer extends React.Component<{}, { t: number }> {
	constructor(props: {}) {
		super(props);

		this.state = {
			t: 0,
		}
	}

	private interval: NodeJS.Timeout | null = null;

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({ t: this.state.t + 0.1 });
		}, 100);
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	render() {
		return <Node id="visualizer" name="Visualizer" io={[
			{ type: "input", name: "signal" }
		]}>
			<Scatter data={{
				datasets: [{
					label: "signal",
					fill: true,
					data: linspace(-Math.PI * 4, 0, 20).map(t => ({x: t, y: Math.sin(t + this.state.t)}))
				}]
			}} options={{
				scales: {
					xAxes: [{
						ticks: {
							min: -Math.PI * 4,
							max: 0,
						}
					}]
				}
			}}/>
		</Node>;
	}
};