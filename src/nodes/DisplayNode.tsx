import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Display } from "../processing/realtime/Display";

export const DisplayNode = observer((props: NodeProps<Display>) => {
	return <Node name="Display" io={[{direction: "input", name: "signal", type: SignalType.RealTime}]} {...props}>
		<TextField disabled value={props.process.last.toFixed(4)} size="small" variant="outlined" label="Signal" type="number"/><br/>
	</Node>;
});
