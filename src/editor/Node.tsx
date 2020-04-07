import React from "react";
import * as uuid from "uuid";
import { Theme, Paper, withStyles, Typography, createStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import Draggable from "react-draggable";
import { ConnectorProps, Connector } from "./Connector";
import { Connectors, Inputs, Outputs } from "./Side";
import { EditorContext, EditorContextType } from "./Types";

const styles = (theme: Theme) => createStyles({
	node: {
		//overflow: "hidden",
		position: "absolute",
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
		padding: `0px ${theme.spacing(1)}px`,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		"& > *": {
			marginTop: `${theme.spacing(1)}px !important`,
		}
	},
	title: {
		lineHeight: "1em",
		color: theme.palette.secondary.contrastText,
	},
});

interface NodeState {
}

interface NodeProps {
	id: string,
	classes: Classes,
	name: string,
	io: Omit<ConnectorProps, "node">[],
	positionOffset?: { x: number, y: number },
}

export const Node = withStyles(styles)(class extends React.Component<NodeProps, NodeState> {
	static contextType = EditorContext;

	constructor(props: NodeProps) {
		super(props);
	}
	
	componentDidMount() {
		console.log("Node created: " + this.props.id);
	}

	componentWillUnmount() {
		console.log("Node deleted: " + this.props.id);
	}

	render() {
		return <Draggable positionOffset={this.props.positionOffset || { x: 100, y: 100 }}  handle={`.${this.props.classes.handle}`}
			onStop={() => this.context.onMoveNode(this.props.id)}
			onDrag={() => this.context.onMoveNode(this.props.id)}>
			<Paper className={this.props.classes.node} elevation={2}>
				<div className={this.props.classes.handle}>
					<Typography className={this.props.classes.title} variant="overline" >{this.props.name}</Typography><br/>
				</div>
				<div className={this.props.classes.controls}>
					{this.props.children}
				</div>
				<Connectors>
					<Inputs>
						{this.props.io.filter(c => c.direction === "input").map(props =>
							<Connector {...props} node={this.props.id} key={props.name}/>
						)}
					</Inputs>
					<Outputs>
						{this.props.io.filter(c => c.direction === "output").map(props =>
							<Connector {...props} node={this.props.id} key={props.name}/>
						)}
					</Outputs>
				</Connectors>
			</Paper>
		</Draggable>;
	}
});
