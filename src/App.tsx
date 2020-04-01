import React, { useState } from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import { CssBaseline, Theme, createMuiTheme, AppBar, Typography, Switch, FormControlLabel, Box, TextField, Drawer, IconButton, Divider, List, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import { withStyles, ThemeProvider, createStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Line, Scatter } from "react-chartjs-2";
import { Editor } from "./editor/Editor";
import { Node } from "./editor/Node";
import { GraphNode } from "./nodes/GraphNode";
import { Connection, connectionEquals, SignalType } from "./editor/Types";
import { Sine } from "./processing/analog/Sine";
import { Sampler } from "./processing/analog/Sampler";
import { SineNode } from "./nodes/SineNode";
import { SamplerNode } from "./nodes/SamplerNode";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { AnalogOutput, AnalogInput } from "./signals/Analog";
import { AnalogSum } from "./processing/analog/AnalogSum";
import { AnalogSumNode } from "./nodes/AnalogSumNode";
import { Display } from "./processing/digital/Display";
import { DisplayNode } from "./nodes/DisplayNode";
import { Output, Input } from "./signals/IO";
import { Delay } from "./processing/digital/Delay";
import { DelayNode } from "./nodes/DelayNode";
import { Graph } from "./processing/digital/Graph";
import { Memory } from "./processing/digital/Memory";
import { MemoryNode } from "./nodes/MemoryNode";
import { Constant } from "./processing/analog/Constant";
import { ConstantNode } from "./nodes/ConstantNode";
import { RealtimeVisualizerNode } from "./nodes/RealtimeVisualizerNode";
import { RealtimeVisualizer } from "./processing/digital/RealtimeVisualizer";
import { DigitalSum } from "./processing/digital/DigitalSum";
import { DigitalSumNode } from "./nodes/DigitalSumNode";
import { Relay } from "./processing/digital/Relay";
import { RelayNode } from "./nodes/RelayNode";
import * as uuid from "uuid";

import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

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
	},
	drawerOpen: {
		width: 250,
		//transition: theme.transitions.create('width', {
		//	easing: theme.transitions.easing.sharp,
		//	duration: theme.transitions.duration.enteringScreen,
		//}),
	},
	drawerClose: {
		//transition: theme.transitions.create('width', {
		//	easing: theme.transitions.easing.sharp,
		//	duration: theme.transitions.duration.leavingScreen,
		//}),
		overflowX: 'hidden',
		width: "56px",//width: theme.spacing(7) + 1,
		//[theme.breakpoints.up('sm')]: {
		//	width: theme.spacing(9) + 1,
		//},
	},
	toggle: {
		marginTop: "48px",
	}
});

class AppState {
	@observable
	public nodes: {[id: string]: any} = {
		"source1": new Sine(),
		"source2": new Sine(),
		"sum": new AnalogSum(),
		"sampler": new Sampler(),
		"display1": new Display(),
		"display2": new Display(),
		"delay1": new Delay(),
		"delay2": new Delay(),
		"graph": new Graph(),
		"memory": new Memory(20),
		"constant1": new Constant(),
		"constant2": new Constant(),
		"realtime": new RealtimeVisualizer(),
		"sum2": new DigitalSum(),
		"sum3": new DigitalSum(),
		"relay": new Relay(),
	}
}

const state = new AppState();

export const App = withStyles(styles)(observer((props: { classes: Classes }) => {
	console.log("render");

	const [ theme, setTheme ] = useState(createMuiTheme({
		palette: {
			type: "dark",
		}
	}));

	const [ graph, setGraph ] = useState<Connection[]>([
		//[["source", "signal"], ["fourier", "input"]],
	]);

	const [ open, setOpen ] = useState<boolean>(false);

	const addConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: Output = state.nodes[outputConnector[0]][outputConnector[1]];
		const input: Input<Output> = state.nodes[inputConnector[0]][inputConnector[1]];

		input.connect(output);

		const newGraph = [...graph, connection];
		console.log("new connection: ", newGraph);
		setGraph(newGraph);
	};

	const removeConnection = (connection: Connection) => {
		const [outputConnector, inputConnector] = connection;

		// We assume that all parts of this connection exist
		const output: Output = state.nodes[outputConnector[0]][outputConnector[1]];
		const input: Input<Output> = state.nodes[inputConnector[0]][inputConnector[1]];

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
	for (const id in state.nodes) {
		const process = state.nodes[id];
		let ProcessNode: any = null;

		if (process instanceof Sampler) {
			ProcessNode = SamplerNode;
		}
		else if (process instanceof Sine) {
			ProcessNode = SineNode;
		}
		else if (process instanceof AnalogSum) {
			ProcessNode = AnalogSumNode;
		}
		else if (process instanceof Display) {
			ProcessNode = DisplayNode;
		}
		else if (process instanceof Delay) {
			ProcessNode = DelayNode;
		}
		else if (process instanceof Memory) {
			ProcessNode = MemoryNode;
		}
		else if (process instanceof Graph) {
			ProcessNode = GraphNode;
		}
		else if (process instanceof Constant) {
			ProcessNode = ConstantNode;
		}
		else if (process instanceof RealtimeVisualizer) {
			ProcessNode = RealtimeVisualizerNode;
		}
		else if (process instanceof DigitalSum) {
			ProcessNode = DigitalSumNode;
		}
		else if (process instanceof Relay) {
			ProcessNode = RelayNode;
		}

		if (ProcessNode) {
			nodes.push(<ProcessNode id={id} key={id} process={process}/>);
		}
	}

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const classes = props.classes;
	return <div className={ props.classes.app }>
		<CssBaseline/>
		<ThemeProvider theme={theme}>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toggle}>
					<IconButton onClick={toggleDrawer}>
						{ open ? <ChevronLeftIcon/> : <ChevronRightIcon /> }
					</IconButton>
				</div>
				<Divider />
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text} onClick={() => {
							state.nodes[uuid.v4()] = new Constant();
							state.nodes = state.nodes;
							console.log(state.nodes);
						}}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
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
			<Editor graph={graph} onConnectionCreated={addConnection} onConnectionDeleted={removeConnection} colors={{
				[SignalType.Analog]: "yellow",
				[SignalType.Digital]: "blue",
				[SignalType.Buffer]: "red",
			}}>
				{nodes}
			</Editor>
		</ThemeProvider>
	</div>;
}));

export default App;
