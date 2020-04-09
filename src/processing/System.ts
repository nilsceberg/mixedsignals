export interface SerializedSystem {
	_: string; // called _ in order to minimize the serialized URL
};

export abstract class System {
	public abstract serialize(): SerializedSystem;
}

export interface SystemConstructor {
	new (config?: any): System;
}
