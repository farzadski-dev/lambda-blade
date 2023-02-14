const glob = require('glob');
const path = require('path');

class LambdaHandler {
	#handlersMap;

	constructor() {
		if (!LambdaHandler._instance) {
			LambdaHandler._instance = this;
			this.#handlersMap = new Map();
		}

		return LambdaHandler._instance;
	}

	init() {
		glob('./handlers/**/*.js', {}, function(er, files) {
			files.forEach((file) => {
				require(path.resolve(file));
			});
			console.info("LAMBDA_HANDLERS_ARE_INITIALIZED");
		});

		return LambdaHandler._instance;
	}

	/**
	 *
	 * @param INTENT
	 * @param handler {Lambda}
	 */
	addHandler(INTENT, handler) {
		this.#handlersMap.set(INTENT, handler);
	}

	get(INTENT) {
		return this.#handlersMap.get(INTENT);
	}

	has(INTENT) {
		return this.#handlersMap.has(INTENT);
	}
}

module.exports = LambdaHandler;
