import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography, createStyles, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Node } from "./Node";
import { Graph, ConnectorName } from "./Types";
import { EditorContextType, EditorContext } from "./Types";
//import { Graph } from "./Graph";

const styles = (theme: Theme) => createStyles({
	editor: {
		marginTop: "48px",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default,
		//backgroundSize: "32px 32px",
		//backgroundImage: `radial-gradient(circle, ${theme.palette.getContrastText(theme.palette.background.default)} 1px, rgba(0, 0, 0, 0) 1px)`,
	},
	graph: {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
	}
});

export interface EditorProps {
	children?: React.ReactNode,
}

interface EditorState {
	mouse: [number, number];
}

export const Editor = withStyles(styles)(class extends React.Component<EditorProps & { classes: Classes }, EditorState> {
	private connectorRefs: { [name: string]: React.RefObject<HTMLDivElement> } = {};

	private graph: React.RefObject<SVGSVGElement> = React.createRef();

	constructor(props: EditorProps & { classes: Classes }) {
		super(props);
	}

	componentDidMount() {
		window.onmousemove = (event: MouseEvent) => {
			const path: SVGPathElement = this.graph.current?.getElementById("mousepath") as SVGPathElement;
			const x = event.clientX;
			const y = event.clientY;
			path.setAttribute("d", `M 100 100 C 160 100, ${x - 60} ${y}, ${x} ${y}`)
		};
	}

	render() {
		const classes = this.props.classes;

		const graph: Graph = [
			[["source","signal"], ["visualizer","signal"]]
		];

		const context: EditorContextType = {
			onClick: (name: ConnectorName) => {
				console.log("Clicked " + name);
				const ref = this.connectorRefs[`${name[0]}/${name[1]}`];
				if (ref && ref.current) {
					ref.current.style.backgroundColor = "red";
					console.log(ref.current.getBoundingClientRect());
				}
			},
			onRef: (name: ConnectorName) => {
				const ref = React.createRef<HTMLDivElement>();
				this.connectorRefs[`${name[0]}/${name[1]}`] = ref;
				return ref;
			}
		}

		return <EditorContext.Provider value={context}>
			<div className={classes.editor}>
				{/*<Graph a={[100, 100]} b={this.state.mouse}/>*/}
				<svg className={classes.graph} ref={this.graph}>
					<path id="mousepath" d={`M 100 100 C 160 100, 400 400, 460 400`} stroke="white" fill="none"/>
				</svg>;
				<Node id="source" name="Sine Wave" io={[{type: "output", name: "signal"}]}>
					<TextField size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
					<TextField size="small" variant="outlined" label="Amplitude" type="number"/><br/>
					<TextField size="small" variant="outlined" label="Phase (rad)" type="number"/>
				</Node>
				<Node id="system1" name="Sum" io={[
					{ type: "input", name: "input0" },
					{ type: "input", name: "input1" },
					{ type: "output", name: "sum" },
				]}>
				</Node>
				<Node id="system2" name="Fourier Transform" io={[
					{ type: "input", name: "input" },
					{ type: "output", name: "mode0" },
					{ type: "output", name: "mode1" },
				]}>
				</Node>
				<Node id="visualizer" name="Visualizer" io={[
					{ type: "input", name: "signal" }
				]}>
				</Node>
			</div>
		</EditorContext.Provider>;
	}
});


