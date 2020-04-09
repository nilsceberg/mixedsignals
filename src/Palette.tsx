import * as React from "react";
import { Theme, createStyles, Box, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Blueprint } from "./editor/Blueprint";
import { Sine } from "./processing/functional/Sine";
import { SystemConstructor } from "./processing/System";
import { SineNode } from "./nodes/SineNode";
import { Sampler } from "./processing/functional/Sampler";
import { Sum } from "./processing/functional/Sum";
import { Display } from "./processing/discrete/Display";
import { Delay } from "./processing/discrete/Delay";
import { Memory } from "./processing/discrete/Memory";
import { Constant } from "./processing/functional/Constant";
import { Graph } from "./processing/discrete/Graph";
import { RealtimeVisualizer } from "./processing/discrete/RealtimeVisualizer";
import { DiscreteSum } from "./processing/discrete/DiscreteSum";
import { DiscreteSumNode } from "./nodes/DiscreteSumNode";
import { RelayNode } from "./nodes/RelayNode";
import { DelayNode } from "./nodes/DelayNode";
import { Relay } from "./processing/discrete/Relay";
import { ConstantNode } from "./nodes/ConstantNode";
import { GraphNode } from "./nodes/GraphNode";
import { MemoryNode } from "./nodes/MemoryNode";
import { DisplayNode } from "./nodes/DisplayNode";
import { SumNode } from "./nodes/SumNode";
import { SamplerNode } from "./nodes/SamplerNode";
import { RealtimeVisualizerNode } from "./nodes/RealtimeVisualizerNode";
import { Clock } from "./processing/realtime/Clock";
import { ClockNode } from "./nodes/ClockNode";
import { Impulse } from "./processing/discrete/Impulse";
import { ImpulseNode } from "./nodes/ImpulseNode";

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		backgroundColor: theme.palette.background.paper,
		position: "absolute",
		left: "0px",
		top: "48px", // app bar height
		bottom: "0px",
		width: "220px", // arbitrary
	},
	sectionHeader: {
		margin: theme.spacing(1),
	}
}));

export interface PaletteProps {
	onPlace?: (system: SystemConstructor, node: any, position: { x: number, y: number }) => void;
}

const Section = (props: { label: string }) => {
	const classes = useStyles();

	return <Typography
		color="textSecondary"
		display="block"
		variant="caption"
		className={classes.sectionHeader}
		>
		{props.label}
	</Typography>;
};

export const Palette = (props: PaletteProps) => {
	const classes = useStyles();
	const onPlace = props.onPlace || (() => {});

	return <Box className={classes.container} boxShadow={5}>
		<Section label="Function"/>
		<Blueprint label="Sine Wave" system={Sine} node={SineNode} onPlace={onPlace}/>
		<Blueprint label="Constant" system={Constant} node={ConstantNode} onPlace={onPlace}/>
		<Blueprint label="Sum" system={Sum} node={SumNode} onPlace={onPlace}/>
		<Divider/>
		<Section label="Discrete"/>
		<Blueprint label="Delay" system={Delay} node={DelayNode} onPlace={onPlace}/>
		{/*<Blueprint label="Relay" system={Relay} node={RelayNode} onPlace={onPlace}/>*/}
		<Blueprint label="Discrete Sum" system={DiscreteSum} node={DiscreteSumNode} onPlace={onPlace}/>
		<Blueprint label="Interactive Impulse" system={Impulse} node={ImpulseNode} onPlace={onPlace}/>
		{/*<Divider/>
		<Section label="Buffers"/>
		<Blueprint label="Buffer Graph" system={Graph} node={GraphNode} onPlace={onPlace}/>*/}
		<Divider/>
		<Section label="Real-Time"/>
		<Blueprint label="Clock" system={Clock} node={ClockNode} onPlace={onPlace}/>
		<Blueprint label="Real-Time Visualizer" system={RealtimeVisualizer} node={RealtimeVisualizerNode} onPlace={onPlace}/>
		<Blueprint label="Display" system={Display} node={DisplayNode} onPlace={onPlace}/>
		<Divider/>
		<Section label="Converters"/>
		<Blueprint label="Sampler" system={Sampler} node={SamplerNode} onPlace={onPlace}/>
		{/*<Blueprint label="Memory" system={Memory} node={MemoryNode} onPlace={onPlace}/>*/}
	</Box>;
}
