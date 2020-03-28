import React from "react";
import { Theme, createStyles, makeStyles, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { ConnectorRadius } from "./Connector";

const sideStyles = (theme: Theme) => createStyles({
	side: {
		//height: "100%",
		//position: "absolute",
		flexBasis: "50%"
	},
	left: {
		//backgroundColor: "red",
		//left: `-${ConnectorRadius}px`,
	},
	right: {
		//backgroundColor: "blue",
		//right: `-${ConnectorRadius}px`,
	}
});

const tableStyles = (theme: Theme) => createStyles({
	table: {
		//padding: theme.spacing(1),
		//paddingTop: theme.spacing(1),
		//backgroundColor: "green",
		display: "flex",
		flexDirection: "row",
	}
});

export const Connectors = withStyles(tableStyles)((props: { classes: Classes, children: React.ReactNode }) =>
	<div className={props.classes.table}>
		{props.children}
	</div>
);

const Side = (side: "left" | "right") => withStyles(sideStyles)((props: { classes: Classes, children?: React.ReactNode }) => {
	return <div className={`${props.classes.side} ${props.classes[side]}`}>
		{props.children}
	</div>;
});

export const Inputs = Side("left");
export const Outputs = Side("right");
