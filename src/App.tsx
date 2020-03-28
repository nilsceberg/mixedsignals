import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";
import { CssBaseline, Theme, createMuiTheme } from "@material-ui/core";
import { withStyles, ThemeProvider, createStyles } from "@material-ui/styles";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Editor } from "./editor/Editor";

const styles = (theme: Theme) => createStyles({
	app: {
		overflow: "hidden",
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "red",
	}
});

const darkTheme = createMuiTheme({
	palette: {
		type: "dark"
	}
});

export const App = withStyles(styles)((props: { classes: Classes }) =>
	<div className={ props.classes.app }>
		<CssBaseline/>
		<ThemeProvider theme={darkTheme}>
			<Editor/>
		</ThemeProvider>
	</div>
);

export default App;
