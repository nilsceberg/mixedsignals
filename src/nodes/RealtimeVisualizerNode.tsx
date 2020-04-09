import React, { useState } from "react";

import { Scatter } from "react-chartjs-2";

import { Node } from "../editor/Node";
import { SignalType } from "../editor/Types";
import { observer } from "mobx-react";
import { NodeProps } from "./Node";
import { Graph } from "../processing/discrete/Graph";
import { RealtimeVisualizer } from "../processing/realtime/RealtimeVisualizer";

@observer
export class RealtimeVisualizerNode extends React.Component<NodeProps<RealtimeVisualizer>, { largest: number }> {
	constructor(props: NodeProps<RealtimeVisualizer>) {
		super(props);
		this.state = {
			largest: 0,
		};
	}

	componentDidUpdate() {
		let largestCandidate = 0;
		for (const y of this.props.process.samples) {
			if (Math.abs(y) > largestCandidate) {
				largestCandidate = Math.abs(y);
			}
		}
		if (largestCandidate > this.state.largest) {
			this.setState({
				largest: largestCandidate
			});
		}
	}

	render() {
		return <Node name="Real-Time Visualizer" io={[{direction: "input", name: "input", type: SignalType.RealTime}, {direction: "input", name: "length", type: SignalType.Function}]} {...this.props}>
				<Scatter data={{
					datasets: [{
						label: "signal",
						fill: false,
						showLine: true,
						backgroundColor: "#fff",
						tension: 0,
						borderWidth: 2,
						borderColor: "#aaa",
						data: this.props.process.samples.map((y, n) => ({x: n, y: y})),
					}]
				}} options={{
					animation: false,
					scales: {
						xAxes: [{
							ticks: {
								min: 0,
								max: this.props.process.currentLength,
							}
						}],
						yAxes: [{
							ticks: {
								min: -this.state.largest,
								max: this.state.largest,
							}
						}]
					}
				}}/>
			</Node>;
	}
}

