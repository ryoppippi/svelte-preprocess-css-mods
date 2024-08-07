import type { SetRequired } from 'type-fest';

/**
 * Options for the cssModules preprocessor
 */
export type Options = {
	/*
	* The pattern to use for module naming
	* @see https://lightningcss.dev/css-modules.html
	*/
	moduleNameingPattern?: string;

	/*
	* Whether to include the original path in the css module
	* @default true
	*/
	includeOriginalPath?: boolean;

	/*
	* Whether to convert the module name to camel case
	* @default true
	*/
	convertToCamelCase?: boolean;
};

export type ResolvedOptions = SetRequired<Options, 'includeOriginalPath'>;

export function resolveOptions(options: Options): ResolvedOptions {
	return {
		moduleNameingPattern: options.moduleNameingPattern,
		includeOriginalPath: options.includeOriginalPath ?? true,
	};
}
