// Definitions by: Martin Randall <https://github.com/MyRedDice>
// TypeScript version 2.1+ (for Promise<T> mapped type)

export = promise_waitfor;

// promise_waitfor will never return a falsy value
// (NaN is also falsy, but not expecting that use here)
type Falsy = false | 0 | "" | null | undefined;

/**
 * Waits for the condition function to return a truthy value.
 * @param  {Function} condition The function that will be called to check the condition.
 * @param {Number} [interval=50] The interval in which to check the condition.
 * @return {Promise.<*>} Resolves what the either condition or value function returned.
 */
declare function promise_waitfor<T>(condition: () => T | Falsy, interval?: number): Promise<T>;

declare namespace promise_waitfor {
	/**
	 * Binds waitFor to the specified promise implementation.
	 * @param  {Function} Promise The promise constructor.
	 * @return {Function} Returns the bound waitFor function.
	 */
    function use<T>(promise: typeof Promise): (condition: () => T | Falsy, interval?: number) => Promise<T>;
}
