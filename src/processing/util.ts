const t0 = Date.now() / 1000.0;
export function time() {
	return Date.now() / 1000.0 - t0;
}