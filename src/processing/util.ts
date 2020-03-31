const t0 = Date.now() / 1000.0;
export function time() {
	return Date.now() / 1000.0 - t0;
}

export const linspace = (a: number, b: number, n: number): number[] => {
	const space = [];
	for (let i=0; i<n; ++i) {
		space.push(i / (n - 1) * (b-a) + a);
	}
	return space;
}
