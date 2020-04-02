import * as React from "react";
import { Button, Theme } from "@material-ui/core";
import Draggable from "react-draggable";
import { makeStyles, createStyles } from "@material-ui/styles";
import { SystemConstructor } from "../processing/System";

export interface BlueprintProps {
	label: string,
	system: SystemConstructor,
	onPlace?: (system: SystemConstructor, position: { x: number, y: number}) => void,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		padding: theme.spacing(1),
		position: "relative",
	},
	button: {
		position: "absolute",
	},
	ghost: {
		position: "absolute",
	},
}));

export const Blueprint = (props: BlueprintProps) => {
	const classes = useStyles();
	const onPlace = props.onPlace || (() => {});
	return (
		<div className={classes.container}>
			<Button className={classes.ghost} color="secondary" variant="outlined" disabled>{props.label}</Button>
			<Draggable position={{x: 0, y: 0}} onStop={(e, data) => onPlace(props.system, { x: data.x, y: data.y })}>
				<Button className={classes.button} color="secondary" variant="contained">{props.label}</Button>
			</Draggable>
		</div>
	);
}
