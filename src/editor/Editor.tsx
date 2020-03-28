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
		<Node name="Sine Wave">
			<TextField size="small" variant="outlined" label="Frequency (Hz)" type="number"/>
			<Connectors>
				<Inputs></Inputs>
				<Outputs>
					<Connector type="output" name="signal"/>
				</Outputs>
			</Connectors>
		</Node>
		<Node name="Sum">
			<Connectors>
				<Inputs>
					<Connector type="input" name="input0"/>
					<Connector type="input" name="input1"/>
				</Inputs>
				<Outputs>
					<Connector type="output" name="sum"/>
				</Outputs>
			</Connectors>
		</Node>
		<Node name="Fourier Transform">
			<Connectors>
				<Inputs>
					<Connector type="input" name="input"/>
				</Inputs>
				<Outputs>
					<Connector type="output" name="mode0"/>
					<Connector type="output" name="mode1"/>
				</Outputs>
			</Connectors>
		</Node>
		<Node name="Visualizer">
			<Connectors>
				<Inputs>
					<Connector type="input" name="input0"/>
					<Connector type="input" name="input1"/>
				</Inputs>
				<Outputs>
				</Outputs>
			</Connectors>
		</Node>
	</div>;
};


