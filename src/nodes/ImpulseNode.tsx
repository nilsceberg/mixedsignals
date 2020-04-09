import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Impulse } from "../processing/discrete/Impulse";

export const ImpulseNode = observer((props: NodeProps<Impulse>) => {
	return <Node name="Interactive Impulse" io={[{direction: "output", name: "output", type: SignalType.Discrete}]} {...props}>
		<Button
			fullWidth
			variant={props.process.pulse ? "contained" : "outlined"}
			onClick={() => props.process.pulse = true}>Trigger</Button>
	</Node>;
});
