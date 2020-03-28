import React from "react";
import { makeStyles, Theme, colors } from "@material-ui/core";

export interface ConnectorProps {
	name: string,
	onConnect?: (name: string, remote: string) => void,
}

export const ConnectorRadius = 8;

const useStyles = makeStyles((theme: Theme) => ({
	connector: {
		backgroundColor: colors.yellow[400],
		boxSizing: "border-box",
		width: `${2 * ConnectorRadius}px`,
		height: `${2 * ConnectorRadius}px`,
		border: `2px solid ${colors.grey[900]}`,
		borderRadius: `${ConnectorRadius}px`,
		margin: `${ConnectorRadius / 2}px 0px`,
	}
}));

export const Connector = (props: ConnectorProps) => {
	const classes = useStyles(props);
	return <div className={classes.connector}>
	</div>;
}
