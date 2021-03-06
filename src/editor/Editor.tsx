import React from "react";
import { Theme, makeStyles, Paper, TextField, InputLabel, AppBar, Typography, createStyles, withStyles, Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { ConnectorName, Connection } from "./Types";
import { EditorContextType, EditorContext } from "./Types";
import { ConnectorRadius } from "./Connector";

import { observer } from "mobx-react";

const styles = (theme: Theme) => createStyles({
	editor: {
		//marginTop: "48px",
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
		filter: theme.palette.type === "light" ? "invert(1)" : "none",
	},
});

export interface EditorProps {
	graph: Connection[];
	children?: React.ReactNode;
	onConnectionCreated?: (connection: Connection) => void;
	onConnectionDeleted?: (connection: Connection) => void;
	colors: { [type: string]: string };
}

interface EditorState {
	connectFrom: ConnectorName | null;
	sourceDirection: "input" | "output";
	sourceType: string;
}

export const Editor = withStyles(styles)(observer(class extends React.Component<EditorProps & { classes: Classes }, EditorState> {
	private connectorRefs: { [name: string]: React.RefObject<HTMLDivElement> } = {};
	private graph: React.RefObject<SVGSVGElement> = React.createRef();
	private lastMouseCoords: [number, number] = [0, 0];

	constructor(props: EditorProps & { classes: Classes }) {
		super(props);

		this.state = {
			connectFrom: null,
			sourceDirection: "input",
			sourceType: "",
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
		if (this.graph.current) {
			// First, clear SVG; remove all paths that are not 'dangling'
			const clear: ChildNode[] = [];

			this.graph.current.childNodes.forEach((child: any) => {
				if (child.getAttribute("id") !== "dangling") {
					clear.push(child);
				}
			});

			for (const child of clear) {
				this.graph.current.removeChild(child);
			}


			for (const connection of this.props.graph) {
				this.drawConnection(connection);
			}
		}

	}

	bezier([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
		return `M ${x1} ${y1} C ${x1 + 100} ${y1}, ${x2 - 100} ${y2}, ${x2} ${y2}`;
	}

	drawDanglingConnection(mouse: [number, number]) {
		const path: SVGPathElement = this.graph.current?.getElementById("dangling") as SVGPathElement;
		if (path && this.state.connectFrom) {
			const connector = this.getConnectorCoordinates(this.state.connectFrom);

			if (this.state.sourceDirection === "input") {
				path.setAttribute("d", this.bezier(mouse, connector));
			}
			else {
				path.setAttribute("d", this.bezier(connector, mouse));
			}
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

	render() {
		const classes = this.props.classes;

		const context: EditorContextType = {
			onClick: (name: ConnectorName, direction: "input" | "output", type: string) => {
				if (this.state.connectFrom) {
					// Can't connect input <-> input or output <-> output
					if (direction === this.state.sourceDirection) return;

					// And we can only connect connectors of the same type
					if (type !== this.state.sourceType) return;

					// Trigger connection creation event
					if (direction === "input") {
						console.log("onConnectionCreated: ", this.state.connectFrom, name);
						if (this.props.onConnectionCreated) this.props.onConnectionCreated([this.state.connectFrom, name]);
					}
					else {
						console.log("onConnectionCreated: ", name, this.state.connectFrom);
						if (this.props.onConnectionCreated) this.props.onConnectionCreated([name, this.state.connectFrom]);
					}

					if (direction === "input") {
						// If there is already a connection here, grab that connection,
						// since inputs can only have one connection
						
						const existing = this.connectionsTo(name);
						if (existing.length === 1) {
							const remote = this.remote(existing[0], name);
							const ref = this.getRef(remote);

							// This is problematic since we have already fired one event
							// that probably will have changed some state higher up.
							// If we in response to the same event, fire another one,
							// the second event handler will probably overwrite the first change.

							// I see three solutions: either implement an onChange and return the entire
							// new graph (which is kind of something I'd like to avoid for flexibility reasons
							// when it comes to the graph data structure, though, even though
							// it's the more React-y way of doing it).

							// The second one is to add a third event handler, which is specifically for this
							// dual-change situation (onConnectionSwapped or similar).

							// The third solution is the worst one, so let's do that! We wait for the
							// current call stack to complete using setTimeout and then trigger our second event.

							setTimeout(() => {
								console.log("onConnectionDeleted: ", remote, name);
								if (this.props.onConnectionDeleted) this.props.onConnectionDeleted([remote, name]);
							}, 0);

							this.setState({
								connectFrom: remote,
								sourceDirection: "output",
								sourceType: type,
							});
						}
						else {
							// Otherwise, simply conclude the edit
							this.setState({
								connectFrom: null
							});
						}
					}
					else {
						// If output, always conclude the edit
						this.setState({
							connectFrom: null
						});
					}
				}
				else {
					if (direction === "input") {
						// If there is already a connection here, grab that connection,
						// since inputs can only have one connection

						const existing = this.connectionsTo(name);
						if (existing.length === 1) {
							const remote = this.remote(existing[0], name);
							const ref = this.getRef(remote);

							// Trigger onConnectionDeleted
							console.log("onConnectionDeleted: ", remote, name);
							if (this.props.onConnectionDeleted) this.props.onConnectionDeleted([remote, name]);

							this.setState({
								connectFrom: remote,
								sourceDirection: "output",
								sourceType: type,
							});
						}
						else {
							// Otherwise, simply create a new one
							this.setState({
								connectFrom: name,
								sourceDirection: direction,
								sourceType: type,
							});
						}
					}
					else {
						// If output, always make a new connection
						this.setState({
							connectFrom: name,
							sourceDirection: direction,
							sourceType: type,
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
			},
			typeColors: this.props.colors,
		}

		return <EditorContext.Provider value={context}>
			<div className={classes.editor}>
				{/*<Graph a={[100, 100]} b={this.state.mouse}/>*/}
				<svg className={classes.graph} ref={this.graph} onClick={event => { console.log("edit cancelled", event.target); this.setState({ connectFrom: null }) }}>
					<path id="dangling" d={this.bezier(this.getConnectorCoordinates(this.state.connectFrom), this.lastMouseCoords)} stroke={this.state.connectFrom ? "white" : "none"} fill="none"/>
				</svg>
				{this.props.children}
			</div>
		</EditorContext.Provider>;
	}
}));


