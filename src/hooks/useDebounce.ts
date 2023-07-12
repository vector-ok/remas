/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Instead of calling a callback directly, use the function to create debounce function
 * When you call the debounce function created by calling this hook, it will debounce using the delay specified
 * i.e. call the callback after the specified delay (in milliseconds)
 * if the debounce function is called before the delay elapses,
 * it will reset the delay timer and wait for it to elapse before calling the callback function
 *
 * @param delayMs Delay in milliseconds
 * @return A function to call, instead of calling the callback directly
 */
function useDebounce<F extends (...args: any) => any>(callback: F, delayMillis: number) {
	let timer: ReturnType<typeof setTimeout>;

	const debounce = function (...args: Parameters<F>): void {
		clearTimeout(timer);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		timer = setTimeout(() => callback(...args), delayMillis);
	};

	return debounce;
}

export default useDebounce;

/*
function debounce<T extends Function>(cb: T, wait = 20) {
	let h = 0;
	let callable = (...args: any) => {
		clearTimeout(h);
		h = setTimeout(() => cb(...args), wait);
	};
	return <T>(<any>callable);
}*/
