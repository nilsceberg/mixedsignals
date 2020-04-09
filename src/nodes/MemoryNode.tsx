import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Memory } from "../processing/discrete/Memory";

export const MemoryNode = observer((props: NodeProps<Memory>) => {
	const [filling, setFilling] = React.useState(false);

	return <Node name="Memory" io={[{direction: "input", name: "input", type: SignalType.Discrete}, {direction: "output", name: "buffer", type: SignalType.Buffer}]} {...props}>
		<TextField value={props.process.length} onChange={e => props.process.length = Math.floor(Number.parseInt(e.target.value))} size="small" variant="outlined" label="Window length" type="number"/><br/>
		<Button fullWidth disabled={filling} variant="outlined" onClick={async () => {
			setFilling(true);
			await props.process.fill();
			setFilling(false);
		}}>Fill</Button>
	</Node>;
});
