import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Sine } from "../processing/functional/Sine";
import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";

export const SineNode = observer((props: NodeProps<Sine>) => {
	return <Node name="Sine Wave" io={[{direction: "output", name: "signal", type: SignalType.Function}]} {...props}>
		<TextField value={props.process.frequency} onChange={event => props.process.frequency = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
		<TextField value={props.process.amplitude} onChange={event => props.process.amplitude = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Amplitude" type="number"/><br/>
		<TextField value={props.process.phase} onChange={event => props.process.phase = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Phase (rad)" type="number"/>
	</Node>;
});
