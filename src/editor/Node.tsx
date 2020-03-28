import React from "react";
import * as uuid from "uuid";
import { Theme, Paper, withStyles, Typography, createStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import Draggable from "react-draggable";

const styles = (theme: Theme) => createStyles({
	node: {
		width: "220px",
		height: "150px",
		padding: theme.spacing(1)
	},
	uuid: {
		fontSize: "7pt",
		lineHeight: "1em",
		textTransform: "uppercase",
		color: theme.palette.grey[600]
	}
});

interface NodeState {
	uuid: string,
}

interface NodeProps {
	classes: Classes,
	name: string,
}

export const Node = withStyles(styles)(class extends React.Component<NodeProps, NodeState> {
	constructor(props: NodeProps) {
		super(props);
		this.state = {
			uuid: uuid.v4()
		};
	}
	
	componentDidMount() {
		console.log("Node created: " + this.state.uuid);
	}

	componentWillUnmount() {
		console.log("Node deleted: " + this.state.uuid);
	}

	render() {
		console.log(this.props);
		return <Draggable>
			<Paper className={this.props.classes.node} elevation={2}>
				<div className={this.props.classes.uuid}>{ this.state.uuid }</div>
				<Typography variant="overline">{this.props.name}</Typography>
				{this.props.children}
			</Paper>
		</Draggable>;
	}
});
