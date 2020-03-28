import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography } from "@material-ui/core";
import { Node } from "./Node";
import { Connectors, Inputs, Outputs } from "./Side";
import { Connector } from "./Connector";

const useStyles = makeStyles((theme: Theme) => ({
	editor: {
		marginTop: "48px",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default,
		//backgroundSize: "32px 32px",
		//backgroundImage: `radial-gradient(circle, ${theme.palette.getContrastText(theme.palette.background.default)} 1px, rgba(0, 0, 0, 0) 1px)`,
	}
}));

export const Editor = (props: {}) => {
	const classes = useStyles(props);
	return <div className={classes.editor}>
		<Node name="Sine Wave" io={[{type: "output", name: "signal"}]}>
			<TextField size="small" variant="outlined" label="Frequency (Hz)" type="number"/>
		</Node>
		<Node name="Sum" io={[
			{ type: "input", name: "input0" },
			{ type: "input", name: "input1" },
			{ type: "output", name: "sum" },
		]}>
		</Node>
		<Node name="Fourier Transform" io={[
			{ type: "input", name: "input" },
			{ type: "output", name: "mode0" },
			{ type: "output", name: "mode1" },
		]}>
		</Node>
		<Node name="Visualizer" io={[
			{ type: "input", name: "signal" }
		]}>
		</Node>
	</div>;
};


