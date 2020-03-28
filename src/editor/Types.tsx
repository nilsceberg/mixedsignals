import React from "react";

export interface EditorContextType {
	onClick: (name: ConnectorName) => void;
	onRef: (name: ConnectorName, ref: React.Ref<HTMLElement>) => void;
}

export const EditorContext = React.createContext<EditorContextType>({
	onClick: () => {},
	onRef: () => {},
});


export type ConnectorName = [string, string];
export type Connection = [ConnectorName, ConnectorName];
export type Graph = Connection[];
