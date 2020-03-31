import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Display } from "../processing/digital/Display";

export const DisplayNode = observer((props: NodeProps<Display>) => {
	return <Node name="Sampler" io={[{direction: "input", name: "signal", type: SignalType.Digital}]} {...props}>
		<TextField disabled value={props.process.last} size="small" variant="outlined" label="Signal" type="number"/><br/>
	</Node>;
});
