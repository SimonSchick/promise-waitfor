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
	extendedPromiseFeature() {}
}

const otherWaitFor = waitFor.use(OtherPromise);
const otherPromise = otherWaitFor(() => true);

// Known limitation - we return an object of type Promise<any>, not OtherPromise<any>
// otherPromise.extendedPromiseFeature();

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
const otherDogPromise1 = otherWaitFor(() => dog1);

otherDogPromise1.then((dog2: Dog) => {
	dog2.woof();
});

const otherDogPromise2: Promise<Dog> = otherWaitFor(() => dog1);
otherDogPromise2.then((dog2) => {
	dog2.woof();
});

const otherDogPromise3: Promise<Dog> = otherWaitFor(() => dog1);
otherDogPromise3.then((dog2) => {
	// Known limitation in TypeScript 2.3
	// With non-native promise currently have to specify the type somewhere
	// See https://github.com/Microsoft/TypeScript/issues/9949
	// dog2.woof();
});

dog1 = new Dog();
