import React from "react";

import { Scatter } from "react-chartjs-2";

import { Node } from "../editor/Node";
import { SignalType } from "../editor/Types";
import { observer } from "mobx-react";
import { NodeProps } from "./Node";
import { Graph } from "../processing/digital/Graph";

export const GraphNode = observer((props: NodeProps<Graph>) => {
	return <Node name="Visualizer" io={[{direction: "input", name: "buffer", type: SignalType.Buffer}]} {...props}>
			<Scatter data={{
				datasets: [{
					label: "signal",
					fill: true,
					data: props.process.samples.map((y, n) => ({x: n - props.process.samples.length, y: y})),
				}]
			}} options={{
				scales: {
					xAxes: [{
						ticks: {
							min: -props.process.samples.length,
							max: 0,
						}
					}]
				}
			}}/>
		</Node>;
});