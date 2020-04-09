import React, { useState } from "react";
import { CssBaseline, Theme, createMuiTheme, AppBar, Typography, Switch, FormControlLabel, Box, TextField, Drawer, IconButton, Divider, List, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import { withStyles, ThemeProvider, createStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Editor } from "./editor/Editor";
import { Connection, connectionEquals, SignalType } from "./editor/Types";
import { Palette, systemNames } from "./Palette";
import { SystemConstructor, System } from "./processing/System";
import { observable, autorun, computed } from "mobx";
import { Output, Input } from "./signals/IO";
import * as uuid from "uuid";
import { observer } from "mobx-react";

const styles = (theme: Theme) => createStyles({
	bar: {
		padding: "8px",
		zIndex: 10000,
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
	},
	drawer: {
		width: 250,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		paddingTop: "48px",
		overflow: "show",
	},
});

interface SystemNode {
	system: System,
	uiNode: any,
	initialPosition: { x: number, y: number },
}

class AppState {
	//public idCounter: number = 0;

	@observable
	public nodes: {[id: string]: SystemNode} = {};

	@observable
	public graph: Connection[] = [];

	@computed
	public get json(): string {
		const serializedNodes: { [key: string]: any } = {};
		for (const key in state.nodes) {
			serializedNodes[key] = state.nodes[key].system.serialize();
		}

		return JSON.stringify({
			nodes: serializedNodes,
			graph: this.graph,
		});
	}

	load(json: string) {
		const config = JSON.parse(json);

		for (const id in config.nodes) {
			const cfg = config.nodes[id];
			const uiNode = systemNames[cfg._].node;
			const system = systemNames[cfg._].system;

			this.nodes[id] = {
				system: new system(),
				uiNode: uiNode,
				initialPosition: {
					x: Math.random() * 500,
					y: Math.random() * 300,
				},
			};
		}

		this.graph = config.graph;
	}
}

const state = new AppState();

try {
	const b64 = window.location.hash.substr(1);
	console.log("URL hash: ", b64);
	const json = atob(b64);
	console.log("Loading from URL: ", json);
	state.load(json);
}
catch (e) {
	console.log("Couldn't load state from URL")
}

autorun(() => {
	console.log(state.json);
	window.location.hash = btoa(state.json);
});

export const App = withStyles(styles)(observer((props: { classes: Classes }) => {
	console.log("render");

	const [ theme, setTheme ] = useState(createMuiTheme({
		palette: {
			type: "dark",
		}
	}));

	const [ open, setOpen ] = useState<boolean>(false);

	const addConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: Output = (state.nodes[outputConnector[0]].system as any)[outputConnector[1]];
		const input: Input<Output> = (state.nodes[inputConnector[0]].system as any)[inputConnector[1]];

		input.connect(output);

		state.graph = [...state.graph, connection];
		console.log("new connection", state.graph);
	};

	const removeConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: Output = (state.nodes[outputConnector[0]].system as any)[outputConnector[1]];
		const input: Input<Output> = (state.nodes[inputConnector[0]].system as any)[inputConnector[1]];

		// Before disconnecting, we need to check that the existing connection
		// actually is the one we want to remove. When swappnig a connection at
		// an input, the remove event is sent after the add event, which means that
		// if we're not careful we'll disconnect the newly attached connection
		// (which will also be inconsistent with the UI).

		if (input.getRemote() === output) {
			input.connect(null);
		}

		state.graph = state.graph.filter(c => !(connectionEquals(c, connection)));
		console.log("removed connection: ", state.graph);
	}

	const placeSystem = (system: SystemConstructor, node: any, position: { x: number, y: number }) => {
		console.log(`Placing ${system.name} at ${position.x}, ${position.y}.`);
		const id = uuid.v4();
		state.nodes[id] = {
			system: new system(),
			uiNode: node,
			initialPosition: position,
		};
	}

	console.log(state.graph);

	const nodes: React.ReactNode[] = [];
	for (const id in state.nodes) {
		const node = state.nodes[id];
		const system = node.system;
		const offset = node.initialPosition;
		let UINode: any = node.uiNode;

		if (UINode) {
			nodes.push(<UINode id={id} key={id} process={system} positionOffset={offset}/>);
		}
	}

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const classes = props.classes;
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
			<Editor graph={state.graph} onConnectionCreated={addConnection} onConnectionDeleted={removeConnection} colors={{
				[SignalType.Function]: "yellow",
				[SignalType.RealTime]: "red",
				[SignalType.Discrete]: "blue",
				[SignalType.Buffer]: "purple",
			}}>
				{nodes}
			</Editor>
			<Palette onPlace={placeSystem}/>
		</ThemeProvider>
	</div>;
}));

export default App;
