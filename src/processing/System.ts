export abstract class System {
	public abstract serialize(): any;
}

export interface SystemConstructor {
	new (config?: any): System;
}
