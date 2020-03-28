import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography } from "@material-ui/core";
import { Node } from "./Node";
import { Inputs, Outputs } from "./Side";
import { Connector } from "./Connector";

const useStyles = makeStyles((theme: Theme) => ({
	editor: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default
	}
}));

export const Editor = (props: {}) => {
	const classes = useStyles(props);
	return <div className={classes.editor}>
		<Node name="Sine wave">
			<TextField size="small" variant="outlined" label="Frequency (Hz)"/>
			<Outputs>
				<Connector name="output"/>
			</Outputs>
		</Node>
		<Node name="System 1">
			<Inputs>
				<Connector name="input"/>
				<Connector name="input2"/>
			</Inputs>
			<Outputs>
				<Connector name="output"/>
			</Outputs>
		</Node>
		<Node name="System 2">
			<Inputs>
				<Connector name="input"/>
			</Inputs>
			<Outputs>
				<Connector name="input"/>
				<Connector name="input2"/>
			</Outputs>
		</Node>
	</div>;
};


