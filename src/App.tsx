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

const sine = new Sine();
const sampler = new Sampler();

export const App = withStyles(styles)((props: { classes: Classes }) => {
	const [ theme, setTheme ] = useState(createMuiTheme({
		palette: {
			type: "dark",
		}
	}));

	const [ graph, setGraph ] = useState<Connection[]>([
		//[["source", "signal"], ["fourier", "input"]],
	]);

	const addConnection = (connection: Connection) => {
		const newGraph = [...graph, connection];
		console.log("new connection: ", newGraph);
		setGraph(newGraph);
	};

	const removeConnection = (connection: Connection) => {
		const newGraph = graph.filter(c => !(connectionEquals(c, connection)));
		console.log("removed connection: ", newGraph);
		setGraph(newGraph);
	}

	console.log(graph);

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
				<SineNode process={sine}/>
				<SamplerNode process={sampler}/>


				<Node id="sum" name="Sum" io={[
					{ type: "input", name: "input0" },
					{ type: "input", name: "input1" },
					{ type: "output", name: "sum" },
				]}>
				</Node>
				<Node id="sum2" name="Sum" io={[
					{ type: "input", name: "input0" },
					{ type: "input", name: "input1" },
					{ type: "output", name: "sum" },
				]}>
				</Node>
				<Node id="fourier" name="Fourier Transform" io={[
					{ type: "input", name: "input" },
					{ type: "output", name: "mode0" },
					{ type: "output", name: "mode1" },
				]}>
				</Node>
				<Visualizer/>
			</Editor>
		</ThemeProvider>
	</div>;
});

export default App;
