import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { Node } from "../editor/Node";
import { NodeProps } from "./Node";
import { SignalType } from "../editor/Types";
import { Source } from "../processing/buffers/Source";

export const SourceNode = observer((props: NodeProps<Source>) => {
	const [downloading, setDownloading] = React.useState(false);

	return <Node name="Memory" io={[{direction: "output", name: "buffer", type: SignalType.Buffer}]} {...props}>
		<TextField value={props.process.url} onChange={e => props.process.url = e.target.value} size="small" variant="outlined" label="URL" type="number"/><br/>
		<Button fullWidth disabled={downloading} variant="outlined" onClick={async () => {
			setDownloading(true);
			await props.process.download();
			setDownloading(false);
		}}>Download</Button>
	</Node>;
});

