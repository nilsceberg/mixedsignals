import React from "react";
import { Theme, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
	editor: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default
	}
}));

export const Editor = (props: {}) => {
	const classes = useStyles(props);
	return <div className={classes.editor}><Paper>hello</Paper></div>
};


