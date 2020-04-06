import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Clock } from "../processing/realtime/Clock";

export const ClockNode = observer((props: NodeProps<Clock>) => {
	return <Node name="Clock" io={[
		{direction: "input", name: "discrete", type: SignalType.Discrete},
		{direction: "output", name: "output", type: SignalType.RealTime},
		{direction: "input", name: "freq", type: SignalType.Function},
		{direction: "output", name: "meta_freq", type: SignalType.Function},
	]} {...props}>
		<TextField disabled={props.process.frequencyInput} value={props.process.frequency} onChange={event => props.process.frequency = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
		<TextField disabled value={props.process.actualFrequency} size="small" variant="outlined" label="Actual frequency (Hz)" type="number"/><br/>
	</Node>;
}); 

