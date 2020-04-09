export type SerializedSystem = { _: string };

export abstract class System {
	public abstract serialize(): SerializedSystem;
}

export interface SystemConstructor {
	new (config?: any): System;
}
