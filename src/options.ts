import type { RequiredDeep, SetOptional } from 'type-fest';
import { defu } from 'defu';

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

export type ResolvedOptions = SetOptional<RequiredDeep<Options>, 'moduleNameingPattern'>;

const defaultOptions = {
	includeOriginalPath: true,
	convertToCamelCase: true,
} as const satisfies ResolvedOptions;

export function resolveOptions(options: Options): Readonly<ResolvedOptions> {
	return defu(options, defaultOptions);
}
