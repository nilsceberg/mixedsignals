import React from "react";

export interface EditorContextType {
	onClick: (name: ConnectorName) => void;
	onRef: (name: ConnectorName) => React.RefObject<HTMLDivElement>;
	onMoveNode: (id: string) => void,
}

export const EditorContext = React.createContext<EditorContextType>({
	onClick: () => {},
	onRef: () => React.createRef(),
	onMoveNode: () => {},
});


export type ConnectorName = [string, string];
export type Connection = [ConnectorName, ConnectorName];
export type Graph = Connection[];
