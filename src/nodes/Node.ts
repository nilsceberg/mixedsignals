export interface NodeProps<T> {
	process: T;
	id: string;
	positionOffset: { x: number, y: number };
}