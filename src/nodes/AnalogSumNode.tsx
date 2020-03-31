import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { AnalogSum } from "../processing/analog/AnalogSum";
import { Node } from "../editor/Node";
import { NodeProps } from "./Node";

export const AnalogSumNode = observer((props: NodeProps<AnalogSum>) => {
	return <Node name="Sum" io={[{type: "input", name: "a"}, {type: "input", name: "b"}, {type: "output", name: "sum"}]} {...props}>
		<TextField value={props.process.aw} onChange={event => props.process.aw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input A weight" type="number"/><br/>
		<TextField value={props.process.bw} onChange={event => props.process.bw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input B weight" type="number"/><br/>
	</Node>;
});

