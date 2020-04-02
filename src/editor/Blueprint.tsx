import * as React from "react";
import { Button, Theme, ButtonBaseActions } from "@material-ui/core";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { makeStyles, createStyles } from "@material-ui/styles";
import { SystemConstructor } from "../processing/System";

export interface BlueprintProps {
	label: string,
	system: SystemConstructor,
	node: any,
	onPlace?: (system: SystemConstructor, node: any, position: { x: number, y: number}) => void,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		margin: theme.spacing(1),
		position: "relative",
		boxSizing: "border-box",
	},
	button: {
		position: "static",
	},
	ghost: {
		position: "absolute",
	},
}));

export const Blueprint = (props: BlueprintProps) => {
	const classes = useStyles();
	const container = React.useRef<HTMLDivElement>(null);
	const onPlace = props.onPlace || (() => {});

	const onDragStop = (e: DraggableEvent, data: DraggableData) => {
		if (container.current === null) return;
		const rect = container.current.getBoundingClientRect();
		onPlace(props.system, props.node, { x: data.x + rect.left, y: data.y + rect.top });
	};

	return (
		<div className={classes.container} ref={container}>
			<Button fullWidth className={classes.ghost} color="secondary" variant="outlined" disabled>{props.label}</Button>
			<Draggable position={{x: 0, y: 0}} onStop={onDragStop}>
				<Button fullWidth className={classes.button} color="secondary" variant="contained">{props.label}</Button>
			</Draggable>
		</div>
	);
}
