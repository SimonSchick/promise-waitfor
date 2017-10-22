'use strict';

import * as waitFor from './index.js';

// 1) Defaults to the native promise implementation
const nativePromise = waitFor(() => true);
nativePromise.then((v) => {}).catch((e) => {});

// 2) Correctly makes the function use the given promise implementation
class OtherPromise<T> extends Promise<T> {
	constructor(executor: (
		resolve: (value?: T | PromiseLike<T>) => void,
		reject: (value?: T | PromiseLike<T>) => void
	) => void) {
		super(executor);
	}
	extendedPromiseFeature() {}
}

// various overload uses
const otherWaitForSimple = waitFor.use(OtherPromise);
const otherWaitForExact = waitFor.use<OtherPromise<any>>(OtherPromise);
const otherWaitForSimpleDogs = waitFor.use<Dog>(OtherPromise);
const otherWaitForExactDogs = waitFor.use<OtherPromise<Dog>>(OtherPromise);

// To workaround some TypeScript limitations, consumer may need a wrapper to reclaim genericity
// See https://github.com/Microsoft/TypeScript/issues/9949
function otherWaitForGeneric<T>(condition: () => T | waitFor.Falsy, interval?: number): OtherPromise<T> {
	return otherWaitForExact(condition, interval);
}

const otherPromise = otherWaitForExact(() => true);
otherPromise.then((v) => {}).catch((e) => {});

const otherPromiseGeneric = otherWaitForGeneric(() => true);
otherPromiseGeneric.then((v) => {}).catch((e) => {});

// Can use extended OtherPromise features
otherPromise.extendedPromiseFeature();
otherPromiseGeneric.extendedPromiseFeature();

// 3) Correctly types an arbitrary class we are waiting for
class Dog {
	woof() {}
}

let dog1: Dog | undefined;
const nativeDogPromise = waitFor(() => dog1);
nativeDogPromise.then((dog2) => {
	dog2.woof();
});

// 4) Dog test also works with non-native promise
// But have to either explicitly specify Dog type or use generic wrapper
const otherDogPromise1 = otherWaitForSimple(() => dog1);

otherDogPromise1.then((dog2: Dog) => {
	dog2.woof();
});

const otherDogPromise2: OtherPromise<Dog> = otherWaitForExact(() => dog1);
otherDogPromise2.then((dog2) => {
	dog2.woof();
});

const otherDogPromise3 = otherWaitForGeneric(() => dog1);
otherDogPromise3.then((dog2) => {
	dog2.woof();
});

const otherDogPromise4 = otherWaitForSimpleDogs(() => dog1);
otherDogPromise4.then((dog2) => {
	dog2.woof();
});

dog1 = new Dog();
