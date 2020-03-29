import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography, createStyles, withStyles } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { Node } from "./Node";
import { Graph, ConnectorName, Connection } from "./Types";
import { EditorContextType, EditorContext } from "./Types";
import { ConnectorRadius } from "./Connector";
//import { Graph } from "./Graph";

const styles = (theme: Theme) => createStyles({
	editor: {
		marginTop: "48px",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		backgroundColor: theme.palette.background.default,
		//backgroundSize: "32px 32px",
		//backgroundImage: `radial-gradient(circle, ${theme.palette.getContrastText(theme.palette.background.default)} 1px, rgba(0, 0, 0, 0) 1px)`,
	},
	graph: {
		position: "fixed",
		top: "0px",
		left: "0px",
		width: "100%",
		height: "100%",
	}
});

export interface EditorProps {
	graph: Connection[],
	children?: React.ReactNode,
}

interface EditorState {
	connectFrom: ConnectorName | null;
	sourceDirection: "input" | "output";
}

export const Editor = withStyles(styles)(class extends React.Component<EditorProps & { classes: Classes }, EditorState> {
	private connectorRefs: { [name: string]: React.RefObject<HTMLDivElement> } = {};
	private graph: React.RefObject<SVGSVGElement> = React.createRef();
	private lastMouseCoords: [number, number] = [0, 0];

	constructor(props: EditorProps & { classes: Classes }) {
		super(props);

		this.state = {
			connectFrom: null,
			sourceDirection: "input",
		};
	}

	componentDidMount() {
		window.onmousemove = (event: MouseEvent) => {
			this.lastMouseCoords = [event.clientX, event.clientY];

			if (this.state.connectFrom) {
				this.drawDanglingConnection([event.clientX, event.clientY]);
			}
		};

		for (const connection of this.props.graph) {
			this.drawConnection(connection);
		}
	}

	componentDidUpdate() {
		for (const connection of this.props.graph) {
			this.drawConnection(connection);
		}
	}

	bezier([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
		return `M ${x1} ${y1} C ${x1 + 100} ${y1}, ${x2 - 100} ${y2}, ${x2} ${y2}`;
	}

	drawDanglingConnection(mouse: [number, number]) {
		const path: SVGPathElement = this.graph.current?.getElementById("mousepath") as SVGPathElement;
		if (path && this.state.connectFrom) {
			const connector = this.getConnectorCoordinates(this.state.connectFrom);
			path.setAttribute("d", this.bezier(connector, mouse));
		}
	}

	drawConnection(connection: Connection) {
		if (this.graph.current) {
			const id = this.getConnectionId(connection);
			let path = this.graph.current.getElementById(id);
			if (!path) {
				path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				path.setAttribute("id", id);
				path.setAttribute("stroke", "white");
				path.setAttribute("fill", "none");
				this.graph.current.appendChild(path);
			}

			const a = this.getConnectorCoordinates(connection[0]);
			const b = this.getConnectorCoordinates(connection[1]);

			path.setAttribute("d", this.bezier(a, b));
		}
	}

	getConnectionId(connection: Connection): string {
		return `${connection[0][0]}-${connection[0][1]}_${connection[1][0]}-${connection[1][1]}`;
	}

	getConnectorCoordinates(name: ConnectorName | null): [number, number] {
		if (name === null) return [0, 0];
		const key = `${name[0]}-${name[1]}`;
		const connector = this.connectorRefs[key];
		if (connector && connector.current) {
			const rect = connector.current.getBoundingClientRect();
			return [rect.x + ConnectorRadius, rect.y + ConnectorRadius];
		}
		else {
			return [0, 0];
		}
	}

	isEndpoint(name: ConnectorName, connection: Connection): boolean {
		return (name[0] === connection[0][0] && name[1] === connection[0][1])
			|| (name[0] === connection[1][0] && name[1] === connection[1][1]);
	}

	connectionsTo(name: ConnectorName): Connection[] {
		return this.props.graph.filter(
			c => this.isEndpoint(name, c)
		);
	}
	
	getRef(name: ConnectorName): React.RefObject<HTMLDivElement> {
		return this.connectorRefs[`${name[0]}-${name[1]}`];
	}

	remote(connection: Connection, here: ConnectorName): ConnectorName {
		if (here[0] === connection[0][0] && here[1] === connection[0][1]) {
			return connection[1];
		}
		else {
			return connection[0];
		}
	}

	//componentWillUpdate() {
	//	console.log("update hook");
	//	this.drawDanglingConnection(this.lastMouseCoords);
	//}

	render() {
		const classes = this.props.classes;

		const graph: Graph = [
			[["source","signal"], ["visualizer","signal"]]
		];

		const context: EditorContextType = {
			onClick: (name: ConnectorName, direction: "input" | "output") => {
				if (this.state.connectFrom) {
					// Can't connect input <-> input or output <-> output
					if (direction === this.state.sourceDirection) return;

					// Trigger connection creation event
					console.log("onConnectionCreated")
					if (direction === "input") {
						// If there is already a connection here, grab that connection,
						// since inputs can only have one connection

						// Trigger onConnectionDeleted
						console.log("onConnectionDeleted");
						
						const existing = this.connectionsTo(name);
						if (existing.length === 1) {
							const remote = this.remote(existing[0], name);
							const ref = this.getRef(remote);
							console.log(remote, ref);

							this.setState({
								connectFrom: remote,
								sourceDirection: direction,
							});
						}
					}
					else {
						// Otherwise, simply conclude the edit
						this.setState({
							connectFrom: null
						});
					}
				}
				else {
					if (direction === "input") {
						// If there is already a connection here, grab that connection,
						// since inputs can only have one connection

						// Trigger onConnectionDeleted
						console.log("onConnectionDeleted");

						const existing = this.connectionsTo(name);
						if (existing.length === 1) {
							const remote = this.remote(existing[0], name);
							const ref = this.getRef(remote);
							console.log(remote, ref);

							this.setState({
								connectFrom: remote,
								sourceDirection: direction,
							});
						}
					}
					else {
						// Otherwise, simply make a new connection
						this.setState({
							connectFrom: name,
							sourceDirection: direction,
						});
					}
				}

				//console.log("Clicked " + name);
				//const ref = this.connectorRefs[`${name[0]}-${name[1]}`];
				//if (ref && ref.current) {
				//	ref.current.style.backgroundColor = "red";
				//	console.log(ref.current.getBoundingClientRect());
				//}
			},
			onRef: (name: ConnectorName) => {
				const ref = React.createRef<HTMLDivElement>();
				this.connectorRefs[`${name[0]}-${name[1]}`] = ref;
				return ref;
			},
			onMoveNode: (name: string) => {
				// Update all edges related to this node
				for (const connection of this.props.graph) {
					if (connection[0][0] === name || connection[1][0] === name) {
						this.drawConnection(connection);
					}
				}
			}
		}

		return <EditorContext.Provider value={context}>
			<div className={classes.editor}>
				{/*<Graph a={[100, 100]} b={this.state.mouse}/>*/}
				<svg className={classes.graph} ref={this.graph} onClick={event => { console.log("edit cancelled", event.target); this.setState({ connectFrom: null }) }}>
					<path id="mousepath" d={this.bezier(this.getConnectorCoordinates(this.state.connectFrom), this.lastMouseCoords)} stroke={this.state.connectFrom ? "white" : "none"} fill="none"/>
				</svg>
				{this.props.children}
			</div>
		</EditorContext.Provider>;
	}
});


