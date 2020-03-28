import React from "react";
import * as uuid from "uuid";
import { Theme, Paper, withStyles, Typography, createStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import Draggable from "react-draggable";

const styles = (theme: Theme) => createStyles({
	node: {
		//overflow: "hidden",
		display: "inline-block",
		width: "auto",
		//overflowX: "auto",
		//width: "220px",
		//height: "150px",
	},
	uuid: {
		display: "none",
		//overflow: "hidden",
		//wordWrap: "break-word",
		fontSize: "7pt",
		lineHeight: "1em",
		textTransform: "uppercase",
		color: theme.palette.grey[600]
	},
	handle: {
		padding: theme.spacing(1),
		overflow: "hidden",
		backgroundColor: theme.palette.secondary.dark,
		cursor: "move",
		borderTopRightRadius: theme.shape.borderRadius,
		borderTopLeftRadius: theme.shape.borderRadius,
	},
	controls: {
		overflow: "default",
		padding: theme.spacing(1),
	},
	title: {
		lineHeight: "1em",
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
		return <Draggable handle={`.${this.props.classes.handle}`}>
			<Paper className={this.props.classes.node} elevation={2}>
				<div className={this.props.classes.handle}>
					{/*<div className={this.props.classes.uuid}>{ this.state.uuid }</div>*/}
					<Typography className={this.props.classes.title} variant="overline" >{this.props.name}</Typography><br/>
				</div>
				<div className={this.props.classes.controls}>
					{this.props.children}
				</div>
			</Paper>
		</Draggable>;
	}
});
