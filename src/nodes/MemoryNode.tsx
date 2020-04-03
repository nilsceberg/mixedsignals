import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Memory } from "../processing/discrete/Memory";

export const MemoryNode = observer((props: NodeProps<Memory>) => {
	return <Node name="Memory" io={[{direction: "input", name: "input", type: SignalType.Discrete}, {direction: "output", name: "buffer", type: SignalType.Buffer}]} {...props}>
		<TextField disabled value={props.process.length} size="small" variant="outlined" label="Window length" type="number"/><br/>
		<TextField disabled value={props.process.memory.toString()} size="small" variant="outlined" label="Contents" type="text"/><br/>
	</Node>;
});
