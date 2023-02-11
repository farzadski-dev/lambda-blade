# lambda-blade

## Installation

```bash
npm install lambda-blade
```

## Usage
for start, you need to create 2 folders in your project: handlers & middlewares.
Then you must install the lambda-blade:

```
const { install } = require('lambda-blade');
install();

```

now inside the handlers create this GetDogsIntent.js, you must follow this structure for working with lambda-blade:

```
// GetDogsIntent.js
const { lambdaHandler, Lambda } = require('lambda-blade').getLambda();

const dogs = ['Boston Terriers', 'Cockapo'];

class GetDogsIntent extends Lambda {
	static INTENT = 'GetDogsIntent';

	constructor() {
		super();
	}

    execute(input) {
		return { dogs };
	}
}

lambdaHandler.addHandler(GetDogsIntent.INTENT, new GetDogsIntent());

module.exports = lambdaHandler;

```

now after you call install() function, you can easily call your lambda:
```
const input = {};
const INTENT = 'GetDogsIntent';
const { lambdaHandler } = require('lambda-blade').getLambda();
const data = lambdaHandler.get(INTENT).execute(input); //input is optinal
console.log(data) // { dogs: [ 'Boston Terriers', 'Cockapo' ] }
```  

now time to make lambda middleware is come, inside middlewares folder create this VerifyTokenIntent.js
```
// VerifyTokenIntent.js
const { lambdaMiddleware, Lambda } = require('lambda-blade').getLambda();

class VerifyTokenIntent extends Lambda {
	static INTENT = 'VerifyTokenIntent';

	async execute(input) {
		if (input?.token !== 'eyJhbGciOiJIUzI1NiJ9') {
			throw new Error("Invalid token");
        } else {
             throw new Error("Token not provided!");
        }
	}
}

lambdaMiddleware.addMiddleware(VerifyTokenIntent.INTENT, new VerifyTokenIntent());

module.exports = lambdaMiddleware;

```
for use of the middleware in GetDogsIntent.js, we refactor it like so:
```
// GetDogsIntent.js
const { lambdaHandler, lambdaMiddleware, Lambda } =	require('lambda-blade').getLambda();

const dogs = ['Boston Terriers', 'Cockapo'];

class GetDogsIntent extends Lambda {
	static INTENT = 'GetDogsIntent';

	constructor() {
		super();
	}

	async execute(input) {
        await lambdaMiddleware.get('VerifyTokenIntent').execute(input);
		return { dogs };
	}
}

lambdaHandler.addHandler(GetDogsIntent.INTENT, new GetDogsIntent());

module.exports = lambdaHandler;

```

now you add VerifyTokenIntent in side the GetDogsIntent.js, now input is no longer optional you must call your lambda like this:

```
const input = { token: "eyJhbGciOiJIUzI1NiJ9" };
const INTENT = 'GetDogsIntent';
const { lambdaHandler } = require('lambda-blade').getLambda();
const data = lambdaHandler.get(INTENT).execute(input);
console.log(data) // { dogs: [ 'Boston Terriers', 'Cockapo' ] }
```  
Easy right ? I think so...