import React, { useState } from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { CssBaseline, Theme, createMuiTheme, AppBar, Typography, Switch, FormControlLabel, Box, TextField } from "@material-ui/core";
import { withStyles, ThemeProvider, createStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Line, Scatter } from "react-chartjs-2";
import { Editor } from "./editor/Editor";
import { Node } from "./editor/Node";
import { Visualizer } from "./nodes/Visualizer";
import { Connection, connectionEquals } from "./editor/Types";
import { Sine } from "./processing/analog/Sine";
import { Sampler } from "./processing/analog/Sampler";
import { SineNode } from "./nodes/SineNode";
import { SamplerNode } from "./nodes/SamplerNode";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";
import { AnalogOutput, AnalogInput } from "./signals/Analog";

const styles = (theme: Theme) => createStyles({
	bar: {
		padding: "8px",
	},
	app: {
		overflow: "hidden",
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "red",
		userSelect: "none",
	},
	barLayout: {
		display: "flex",
		flexDirection: "row"
	},
	title: {
		flexGrow: 1,
		height: "100%",
		verticalAlign: "middle"
	}
});

const state: {[id: string]: any} = observable({
	"source": new Sine(),
	"sampler": new Sampler(),
}, {}, { deep: false });

export const App = observer(withStyles(styles)((props: { classes: Classes }) => {
	const [ theme, setTheme ] = useState(createMuiTheme({
		palette: {
			type: "dark",
		}
	}));

	const [ graph, setGraph ] = useState<Connection[]>([
		//[["source", "signal"], ["fourier", "input"]],
	]);

	const addConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: AnalogOutput = state[outputConnector[0]][outputConnector[1]];
		const input: AnalogInput = state[inputConnector[0]][inputConnector[1]];

		input.connect(output);

		const newGraph = [...graph, connection];
		console.log("new connection: ", newGraph);
		setGraph(newGraph);
	};

	const removeConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: AnalogOutput = state[outputConnector[0]][outputConnector[1]];
		const input: AnalogInput = state[inputConnector[0]][inputConnector[1]];

		// Before disconnecting, we need to check that the existing connection
		// actually is the one we want to remove. When swappnig a connection at
		// an input, the remove event is sent after the add event, which means that
		// if we're not careful we'll disconnect the newly attached connection
		// (which will also be inconsistent with the UI).

		if (input.getRemote() === output) {
			input.connect(null);
		}

		const newGraph = graph.filter(c => !(connectionEquals(c, connection)));
		console.log("removed connection: ", newGraph);
		setGraph(newGraph);
	}

	console.log(graph);

	const nodes: React.ReactNode[] = [];
	for (const id in state) {
		const process = state[id];
		let ProcessNode: any = null;

		if (process instanceof Sampler) {
			ProcessNode = SamplerNode;
		}
		else if (process instanceof Sine) {
			ProcessNode = SineNode;
		}

		if (ProcessNode) {
			nodes.push(<ProcessNode id={id} process={process}/>);
		}
	}

	return <div className={ props.classes.app }>
		<CssBaseline/>
		<ThemeProvider theme={theme}>
			<AppBar className={props.classes.bar}>
				<Box className={props.classes.barLayout}>
					<Typography className={props.classes.title} variant="h6" display="inline">MixedSignals v0.1.0</Typography>
					<FormControlLabel className={props.classes.theme} label="Dark mode" control={<Switch size="small" checked={theme.palette.type === "dark"} title="Dark mode" onChange={event => {
						setTheme(createMuiTheme({
							palette: {
								type: event.target.checked ? "dark" : "light"
							}
						}))
					}}/>}/>
				</Box>
			</AppBar>
			<Editor graph={graph} onConnectionCreated={addConnection} onConnectionDeleted={removeConnection}>
				{nodes}
			</Editor>
		</ThemeProvider>
	</div>;
}));

export default App;
