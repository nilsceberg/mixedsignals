import React, { useState } from "react";

import { Scatter } from "react-chartjs-2";

import { Node } from "../editor/Node";
import { SignalType } from "../editor/Types";
import { observer } from "mobx-react";
import { NodeProps } from "./Node";
import { Graph } from "../processing/discrete/Graph";

@observer
export class GraphNode extends React.Component<NodeProps<Graph>, { largest: number }> {
	constructor(props: NodeProps<Graph>) {
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
		return <Node name="Buffer Graph" io={[{direction: "input", name: "buffer", type: SignalType.Buffer}]} {...this.props}>
				<Scatter
					width={500}
					height={300}
					data={{
					datasets: [{
						label: "signal",
						fill: false,
						showLine: true,
						tension: 0,
						borderWidth: 1,
						pointRadius: 0,
						borderColor: "#aaa",
						pointStyle: "none",
						data: this.props.process.samples.map((y, n) => ({x: n - this.props.process.samples.length, y: y})),
					}]
				}} options={{
					animation: false,
					scales: {
						xAxes: [{
							ticks: {
								min: -this.props.process.samples.length,
								max: 0,
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
