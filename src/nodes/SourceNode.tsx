import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Source } from "../processing/buffers/Source";

export const SourceNode = observer((props: NodeProps<Source>) => {
	return <Node name="JSON Source" io={[{direction: "output", name: "buffer", type: SignalType.Buffer}]} {...props}>
		<TextField value={props.process.url} onChange={e => props.process.url = e.target.value} size="small" variant="outlined" label="URL" type="text"/><br/>
		<Button fullWidth disabled={props.process.downloading} variant="outlined" onClick={async () => {
			await props.process.download();
		}}>Fetch</Button>
	</Node>;
});
