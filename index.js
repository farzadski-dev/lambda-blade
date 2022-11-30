const LambdaHandler = require('./LambdaHandler');
const LambdaMiddleware = require('./LambdaMiddleware');
const Lambda = require('./Lambda');

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
