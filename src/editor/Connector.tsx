import React from "react";
import { makeStyles, Theme, colors, Paper, withStyles, createStyles } from "@material-ui/core";
import { ConnectorName, EditorContext, EditorContextType } from "./Types";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

export interface ConnectorProps {
	type: "input" | "output",
	name: string,
	node: string,
	onConnect?: (me: ConnectorName, remote: ConnectorName) => boolean,
}

export const ConnectorRadius = 8;

const styles = (theme: Theme) => createStyles({
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
});

export const Connector = withStyles(styles)(class extends React.Component<ConnectorProps & { classes: Classes }, {}> {
	static contextType = EditorContext;

	render() {
		const classes = this.props.classes;
		return <div className={classes.container}>
				<div className={classes.dummy}/>
				<div className={classes.label}>{this.props.name}</div>
				<div className={classes.connector} onClick={() => this.context.onClick([this.props.node, this.props.name], this.props.type)} ref={this.context.onRef([this.props.node, this.props.name])}></div>
			</div>;
	}
});
