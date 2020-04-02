import * as React from "react";
import { Theme, createStyles, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Blueprint } from "./editor/Blueprint";
import { Sine } from "./processing/analog/Sine";
import { SystemConstructor } from "./processing/System";
import { SineNode } from "./nodes/SineNode";
import { Sampler } from "./processing/analog/Sampler";
import { AnalogSum } from "./processing/analog/AnalogSum";
import { Display } from "./processing/digital/Display";
import { Delay } from "./processing/digital/Delay";
import { Memory } from "./processing/digital/Memory";
import { Constant } from "./processing/analog/Constant";
import { Graph } from "./processing/digital/Graph";
import { RealtimeVisualizer } from "./processing/digital/RealtimeVisualizer";
import { DigitalSum } from "./processing/digital/DigitalSum";
import { DigitalSumNode } from "./nodes/DigitalSumNode";
import { RelayNode } from "./nodes/RelayNode";
import { DelayNode } from "./nodes/DelayNode";
import { Relay } from "./processing/digital/Relay";
import { ConstantNode } from "./nodes/ConstantNode";
import { GraphNode } from "./nodes/GraphNode";
import { MemoryNode } from "./nodes/MemoryNode";
import { DisplayNode } from "./nodes/DisplayNode";
import { AnalogSumNode } from "./nodes/AnalogSumNode";
import { SamplerNode } from "./nodes/SamplerNode";
import { RealtimeVisualizerNode } from "./nodes/RealtimeVisualizerNode";

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		backgroundColor: theme.palette.background.paper,
		position: "absolute",
		left: "0px",
		top: "48px", // app bar height
		bottom: "0px",
		width: "220px", // arbitrary
	}
	/* Kept for reference from old drawer:
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
	}*/
}));

export interface PaletteProps {
	onPlace?: (system: SystemConstructor, node: any, position: { x: number, y: number }) => void;
}

export const Palette = (props: PaletteProps) => {
	const classes = useStyles();
	const onPlace = props.onPlace || (() => {});

	return <Box className={classes.container} boxShadow={5}>
		<Blueprint label="Sine Wave" system={Sine} node={SineNode} onPlace={onPlace}/>
		<Blueprint label="AD Converter" system={Sampler} node={SamplerNode} onPlace={onPlace}/>
		<Blueprint label="Analog Sum" system={AnalogSum} node={AnalogSumNode} onPlace={onPlace}/>
		<Blueprint label="Display" system={Display} node={DisplayNode} onPlace={onPlace}/>
		<Blueprint label="Delay" system={Delay} node={DelayNode} onPlace={onPlace}/>
		<Blueprint label="Memory" system={Memory} node={MemoryNode} onPlace={onPlace}/>
		<Blueprint label="Buffer Graph" system={Graph} node={GraphNode} onPlace={onPlace}/>
		<Blueprint label="Constant" system={Constant} node={ConstantNode} onPlace={onPlace}/>
		<Blueprint label="Real-Time Visualizer" system={RealtimeVisualizer} node={RealtimeVisualizerNode} onPlace={onPlace}/>
		<Blueprint label="Digital Sum" system={DigitalSum} node={DigitalSumNode} onPlace={onPlace}/>
		<Blueprint label="Relay" system={Relay} node={RelayNode} onPlace={onPlace}/>
	</Box>;
}


		/*if (system instanceof Sampler) {
			ProcessNode = SamplerNode;
		}
		else if (system instanceof Sine) {
			ProcessNode = SineNode;
		}
		else if (system instanceof AnalogSum) {
			ProcessNode = AnalogSumNode;
		}
		else if (system instanceof Display) {
			ProcessNode = DisplayNode;
		}
		else if (system instanceof Delay) {
			ProcessNode = DelayNode;
		}
		else if (system instanceof Memory) {
			ProcessNode = MemoryNode;
		}
		else if (system instanceof Graph) {
			ProcessNode = GraphNode;
		}
		else if (system instanceof Constant) {
			ProcessNode = ConstantNode;
		}
		else if (system instanceof RealtimeVisualizer) {
			ProcessNode = RealtimeVisualizerNode;
		}
		else if (system instanceof DigitalSum) {
			ProcessNode = DigitalSumNode;
		}
		else if (system instanceof Relay) {
			ProcessNode = RelayNode;
		}*/