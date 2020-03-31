import * as React from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Constant } from "../processing/analog/Constant";

export const ConstantNode = observer((props: NodeProps<Constant>) => {
	return <Node name="Constant" io={[{direction: "output", name: "constant", type: SignalType.Analog}]} {...props}>
		<TextField onChange={e => props.process.value = Number.parseFloat(e.target.value)} value={props.process.value} size="small" variant="outlined" label="Value" type="number"/><br/>
	</Node>;
});

