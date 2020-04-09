export interface NodeProps<T> {
	process: T;
	id: string;
	position: { x: number, y: number };
	onMove: (to: { x: number, y: number}) => void;
}