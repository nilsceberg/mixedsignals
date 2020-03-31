import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { AnalogSum } from "../processing/analog/AnalogSum";
import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";

export const AnalogSumNode = observer((props: NodeProps<AnalogSum>) => {
	return <Node name="Sum" io={[
		{direction: "input", name: "a", type: SignalType.Analog},
		{direction: "input", name: "b", type: SignalType.Analog},
		{direction: "output", name: "sum", type: SignalType.Analog},
	]} {...props}>
		<TextField value={props.process.aw} onChange={event => props.process.aw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input A weight" type="number"/><br/>
		<TextField value={props.process.bw} onChange={event => props.process.bw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input B weight" type="number"/><br/>
	</Node>;
});

