'use strict';

import * as waitFor from './index.js';

// 1) Defaults to the native promise implementation
const nativePromise = waitFor(() => true);

// 2) Correctly makes the function use the given promise implementation
class OtherPromise<T> extends Promise<T> {
	constructor(executor: (
		resolve: (value?: T | PromiseLike<T>) => void,
		reject: (value?: T | PromiseLike<T>) => void
	) => void) {
		super(executor);
	}
}

const otherWaitFor = waitFor.use(OtherPromise);
const otherPromise = otherWaitFor(() => true);

// 3) Correctly types an arbitrary class we are waiting for
class Dog {
	woof() {}
}

let dog1: Dog | undefined = undefined;
const dogPromise = waitFor(() => dog1);
dogPromise.then((dog2) => {
	dog2.woof();
});

// 4) Dog test also works with non-native promise
/* currently fails
const otherDogPromise = otherWaitFor(() => dog1);
otherDogPromise.then((dog2) => {
	dog2.woof();
});

dog1 = new Dog();
*/
