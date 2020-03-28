import React from "react";
import { Theme, createStyles, makeStyles, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { ConnectorRadius } from "./Connector";

const styles = (theme: Theme) => createStyles({
	side: {
		height: "100%",
		position: "absolute",
	},
	left: {
		left: `-${ConnectorRadius}px`,
	},
	right: {
		right: `-${ConnectorRadius}px`,
	}
});

const Side = (side: "left" | "right") => withStyles(styles)((props: { classes: Classes, children: React.ReactNode }) => {
	return <div className={`${props.classes.side} ${props.classes[side]}`}>{props.children}</div>;
})

export const Inputs = Side("left");
export const Outputs = Side("right");
