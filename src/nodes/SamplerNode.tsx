import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { Sampler } from "../processing/analog/Sampler";

export interface SamplerProps {
	process: Sampler
}

export const SamplerNode = observer((props: SamplerProps) => {
	return <Node id="source" name="Sampler" io={[{type: "input", name: "analog"}, {type: "output", name: "digital"}]}>
		<TextField value={props.process.frequency} onChange={event => props.process.frequency = Number.parseFloat(event.target.value)} size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
	</Node>;
});
