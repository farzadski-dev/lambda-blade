const LambdaHandler = require('./lib/LambdaHandler');
const LambdaMiddleware = require('./lib/LambdaMiddleware');
const Lambda = require('./lib/Lambda');

let lambdaHandler;
let lambdaMiddleware;

module.exports = {
	install: () => {
		lambdaMiddleware = new LambdaMiddleware().init();
		lambdaHandler = new LambdaHandler().init();
	},
	getLambda: () => {
		return {
			lambdaHandler,
			lambdaMiddleware,
			Lambda,
		};
	},
};
