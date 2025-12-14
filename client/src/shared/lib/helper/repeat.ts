export default function repeat<T>(count: number, fn: (index: number) => T) {
	return new Array(count).fill(0).map(index => fn(index));
}
