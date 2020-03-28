import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography, createStyles, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Node } from "./Node";
import { Graph, ConnectorName } from "./Types";
import { EditorContextType, EditorContext } from "./Types";

const styles = (theme: Theme) => createStyles({
	editor: {
		marginTop: "48px",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default,
		//backgroundSize: "32px 32px",
		//backgroundImage: `radial-gradient(circle, ${theme.palette.getContrastText(theme.palette.background.default)} 1px, rgba(0, 0, 0, 0) 1px)`,
	}
});

export interface EditorProps {
	children?: React.ReactNode,
}

export const Editor = withStyles(styles)(class extends React.Component<EditorProps & { classes: Classes }> {
	private connectorRefs: { [name: string]: React.Ref<HTMLElement> } = {};

	render() {
		const classes = this.props.classes;

		const graph: Graph = [
			[["source","signal"], ["visualizer","signal"]]
		];

		const context: EditorContextType = {
			onClick: (name: ConnectorName) => { console.log("Clicked " + name)},
			onRef: () => {},
		}

		return <EditorContext.Provider value={context}>
			<div className={classes.editor}>
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


