import React from "react";

export enum SignalType {
	Analog = "analog",
	Digital = "digital",
	Buffer = "buffer",
}

export interface EditorContextType {
	onClick: (name: ConnectorName, direction: "input" | "output", type: string) => void;
	onRef: (name: ConnectorName) => React.RefObject<HTMLDivElement>;
	onMoveNode: (id: string) => void,
	typeColors: { [type: string]: string },
}

export const EditorContext = React.createContext<EditorContextType>({
	onClick: () => {},
	onRef: () => React.createRef(),
	onMoveNode: () => {},
	typeColors: {}
});


export type ConnectorName = [string, string];
export type Connection = [ConnectorName, ConnectorName];
export type Graph = Connection[];

export function connectorEquals(a: ConnectorName, b: ConnectorName): boolean {
	return a[0] === b[0] && a[1] === b[1];
}

export function connectionEquals(a: Connection, b: Connection): boolean {
	return (connectorEquals(a[0], b[0]) && connectorEquals(a[1], b[1]))
		|| (connectorEquals(a[0], b[1]) && connectorEquals(a[1], b[0]));
}
