const glob = require('glob');
const path = require('path');

class LambdaMiddleware {
	#middlewareMap;

	constructor() {
		if (!LambdaMiddleware._instance) {
			LambdaMiddleware._instance = this;
			this.#middlewareMap = new Map();
		}

		return LambdaMiddleware._instance;
	}

	init() {
		glob('./middlewares/**/*.js', {}, function (er, files) {
			console.log(files);
			files.forEach((file) => {
				require(path.resolve(file));
			});
		});

		return LambdaMiddleware._instance;
	}

	/**
	 *
	 * @param INTENT
	 * @param handler {Lambda}
	 */
	addMiddleware(INTENT, handler) {
		this.#middlewareMap.set(INTENT, handler);
	}

	get(INTENT) {
		return this.#middlewareMap.get(INTENT);
	}
}

module.exports = LambdaMiddleware;
