import path from 'node:path';

/** @param {...string} args */
function relativePath(...args) {
	return path.resolve(import.meta.dirname, ...args);
}

const config = {
	kit: {
		alias: {
			$css: relativePath('./tests/assets'),
		},
	},
};

export default config;
