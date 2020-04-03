import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Sum } from "../processing/functional/Sum";
import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";

export const SumNode = observer((props: NodeProps<Sum>) => {
	return <Node name="Sum" io={[
		{direction: "input", name: "a", type: SignalType.Function},
		{direction: "input", name: "b", type: SignalType.Function},
		{direction: "output", name: "sum", type: SignalType.Function},
	]} {...props}>
		<TextField value={props.process.aw} onChange={event => props.process.aw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input A weight" type="number"/><br/>
		<TextField value={props.process.bw} onChange={event => props.process.bw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input B weight" type="number"/><br/>
	</Node>;
});
