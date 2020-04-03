import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Delay } from "../processing/discrete/Delay";

export const DelayNode = observer((props: NodeProps<Delay>) => {
	return <Node name="Delay (z⁻¹)" io={[{direction: "input", name: "input", type: SignalType.Discrete}, {direction: "output", name: "output", type: SignalType.Discrete}]} {...props}>
	</Node>;
});
