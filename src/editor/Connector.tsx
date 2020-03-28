import React from "react";
import { makeStyles, Theme, colors, Paper } from "@material-ui/core";
import { ConnectorName, EditorContext } from "./Types";

export interface ConnectorProps {
	type: "input" | "output",
	name: string,
	node: string,
	onConnect?: (me: ConnectorName, remote: ConnectorName) => boolean,
}

export const ConnectorRadius = 8;

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		boxSizing: "border-box",
		flexBasis: "80%",
		display: "flex",
		flexDirection: (props: ConnectorProps) => props.type === "output" ? "row" : "row-reverse",
		marginBottom: theme.spacing(1),
		position: "relative",
		right: (props: ConnectorProps) => props.type === "output" ? `-${ConnectorRadius}px` : undefined,
		left: (props: ConnectorProps) => props.type === "input" ? `-${ConnectorRadius}px` : undefined,
	},
	dummy: {
		flexGrow: 1,
	},
	label: {
		textAlign: (props: ConnectorProps) => props.type === "output" ? "right" : "left",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		boxSizing: "border-box",
		padding: "2px",
		borderRadius: "2px",
		height: "100%",
		fontSize: "7pt",
		flexGrow: 0,
		verticalAlign: "middle",
		backgroundColor: theme.palette.background.default,
	},
	connector: {
		flexGrow: 0,
		backgroundColor: colors.yellow[400],
		boxSizing: "border-box",
		width: `${2 * ConnectorRadius}px`,
		height: `${2 * ConnectorRadius}px`,
		border: `2px solid ${colors.grey[900]}`,
		borderRadius: `${ConnectorRadius}px`,
		cursor: "pointer",
	}
}));

export const Connector = (props: ConnectorProps) => {
	const classes = useStyles(props);
	return <EditorContext.Consumer>
		{value =>
			<div className={classes.container} onClick={() => value.onClick([props.node, props.name])}>
				<div className={classes.dummy}/>
				<div className={classes.label}>{props.name}</div>
				<div className={classes.connector}></div>
			</div>
		}
	</EditorContext.Consumer>;
}
