import * as React from "react";
import { TextField, ButtonGroup, Button, FormControlLabel, FormControl } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { DiscreteSum } from "../processing/discrete/DiscreteSum";

export const DiscreteSumNode = observer((props: NodeProps<DiscreteSum>) => {
	return <Node name="Digital Sum" io={[
		{direction: "input", name: "a", type: SignalType.Discrete},
		{direction: "input", name: "b", type: SignalType.Discrete},
		{direction: "output", name: "sum", type: SignalType.Discrete},
	]} {...props}>
		<TextField value={props.process.aw} onChange={event => props.process.aw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input A weight" type="number"/><br/>
		<TextField value={props.process.bw} onChange={event => props.process.bw = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Input B weight" type="number"/><br/>
	</Node>;
});
