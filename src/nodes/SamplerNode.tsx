import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { Sampler } from "../processing/functional/Sampler";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";

export const SamplerNode = observer((props: NodeProps<Sampler>) => {
	return <Node name="Sampler" io={[
		{direction: "input", name: "function", type: SignalType.Function},
		{direction: "output", name: "discrete", type: SignalType.Discrete},
		{direction: "output", name: "meta_freq", type: SignalType.Function},
	]} {...props}>
		<TextField value={props.process.frequency} onChange={event => props.process.frequency = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
		<TextField disabled value={props.process.lastSample} size="small" variant="outlined" label="Last sample" type="number"/><br/>
	</Node>;
}); 
