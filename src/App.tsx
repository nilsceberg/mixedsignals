import React, { useState } from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { CssBaseline, Theme, createMuiTheme, AppBar, Typography, Switch, FormControlLabel, Box, TextField } from "@material-ui/core";
import { withStyles, ThemeProvider, createStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Editor } from "./editor/Editor";
import { Node } from "./editor/Node";

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

export const App = withStyles(styles)((props: { classes: Classes }) => {
	const [ theme, setTheme ] = useState(createMuiTheme({
		palette: {
			type: "dark",
		}
	}));

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
			<Editor graph={[
				[["source", "signal"], ["fourier", "input"]],
				[["fourier", "mode0"], ["sum", "input1"]],
				[["fourier", "mode1"], ["sum", "input0"]],
				[["sum", "sum"], ["visualizer", "signal"]],
			]}>
				<Node id="source" name="Sine Wave" io={[{type: "output", name: "signal"}]}>
					<TextField size="small" variant="outlined" label="Frequency (Hz)" type="number"/><br/>
					<TextField size="small" variant="outlined" label="Amplitude" type="number"/><br/>
					<TextField size="small" variant="outlined" label="Phase (rad)" type="number"/>
				</Node>
				<Node id="sum" name="Sum" io={[
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
				<Node id="visualizer" name="Visualizer" io={[
					{ type: "input", name: "signal" }
				]}>
				</Node>
			</Editor>
		</ThemeProvider>
	</div>;
});

export default App;
