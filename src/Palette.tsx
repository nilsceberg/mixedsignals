import * as React from "react";
import { Theme, createStyles, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Blueprint } from "./editor/Blueprint";
import { Sine } from "./processing/analog/Sine";
import { SystemConstructor } from "./processing/System";

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		backgroundColor: theme.palette.background.paper,
		position: "absolute",
		left: "0px",
		top: "48px", // app bar height
		bottom: "0px",
		width: "200px", // arbitrary
	}
	/* Kept for reference from old drawer:
	drawerOpen: {
		width: 250,
		//transition: theme.transitions.create('width', {
		//	easing: theme.transitions.easing.sharp,
		//	duration: theme.transitions.duration.enteringScreen,
		//}),
	},
	drawerClose: {
		//transition: theme.transitions.create('width', {
		//	easing: theme.transitions.easing.sharp,
		//	duration: theme.transitions.duration.leavingScreen,
		//}),
		overflowX: 'hidden',
		width: "56px",//width: theme.spacing(7) + 1,
		//[theme.breakpoints.up('sm')]: {
		//	width: theme.spacing(9) + 1,
		//},
	},
	toggle: {
		marginTop: "48px",
	}*/
}));

export interface PaletteProps {
	onPlace?: (system: SystemConstructor, position: { x: number, y: number }) => void;
}

export const Palette = (props: PaletteProps) => {
	const classes = useStyles();
	const onPlace = props.onPlace || (() => {});

	return <Box className={classes.container} boxShadow={5}>
		<Blueprint label="Sine Wave" system={Sine} onPlace={onPlace}/>
	</Box>;
}
