import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Relay } from "../processing/digital/Relay";

export const RelayNode = observer((props: NodeProps<Relay>) => {
	return <Node name="Relay" io={[{direction: "input", name: "input", type: SignalType.Digital}, {direction: "output", name: "output", type: SignalType.Digital}]} {...props}>
	</Node>;
});
