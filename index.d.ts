// Definitions by: Martin Randall <https://github.com/MyRedDice>
// TypeScript version 2.1+

// Note: I was unable to get generic types working for the waitFor.use(MyPromise) use 
//       So you may wish to use the workaround code below to use it in the same way as waitFor.
//       Vote for https://github.com/Microsoft/TypeScript/issues/9949 to change this?

/* BEGIN SUGGESTED WRAPPER CODE
import * as promiseWaitFor from "promise-waitfor";
import * as MyPromise from "mypromise";
const promiseWaitForBound = promiseWaitFor.use(MyPromise);
export function waitFor<T>(condition: () => T | promiseWaitFor.Falsy, interval?: number): MyPromise<T> {
    return promiseWaitForBound(condition, interval);
}
 * END SUGGESTED WRAPPER CODE
 */

export = promise_waitfor;

/**
 * Waits for the condition function to return a truthy value.
 * @param  {Function} condition The function that will be called to check the condition.
 * @param {Number} [interval=50] The interval in which to check the condition.
 * @return {Promise.<*>} Resolves what the either condition or value function returned.
 */
declare function promise_waitfor<T>(condition: () => T | promise_waitfor.Falsy, interval?: number): Promise<T>;

declare namespace promise_waitfor {
	// promise_waitfor will never return a falsy value
	// (NaN is also falsy, but not expecting that use here)
	type Falsy = false | 0 | "" | null | undefined;

	/**
	 * Binds waitFor to the specified promise implementation.
	 * @param  {Function} Promise The promise constructor.
	 * @return {Function} Returns the bound waitFor function.
	 */

	function use<PROM extends Promise<any>>(Promise: PromiseConstructor)
		: (condition: () => any, interval?: number)
		=> PROM;

	function use<T>(Promise: PromiseConstructor)
		: (condition: () => T | Falsy, interval?: number)
		=> Promise<T>;

	 function use(Promise: PromiseConstructor)
		: (condition: () => any, interval?: number)
		=> Promise<any>;

	function use<PROM extends PromiseLike<any>>(Promise: PromiseConstructorLike)
		: (condition: () => any, interval?: number)
		=> PROM;

	function use<T>(Promise: PromiseConstructorLike)
		: (condition: () => T | Falsy, interval?: number)
		=> PromiseLike<T>;

	 function use(Promise: PromiseConstructorLike)
		: (condition: () => any, interval?: number)
		=> PromiseLike<any>;
}
