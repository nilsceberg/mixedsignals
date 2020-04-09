import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Replay } from "../processing/discrete/Replay";

export const ReplayNode = observer((props: NodeProps<Replay>) => {
	return <Node name="Replay" io={[{direction: "input", name: "buffer", type: SignalType.Buffer}, {direction: "output", name: "signal", type: SignalType.Discrete}]} {...props}>
		<Button
			fullWidth
			variant={"outlined"}
			onClick={() => props.process.reset()}>Reset</Button>
	</Node>;
});
