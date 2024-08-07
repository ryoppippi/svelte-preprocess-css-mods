import type { PartialDeep, RequiredDeep, SetOptional } from 'type-fest';
import { defu } from 'defu';

/**
 * Options for the cssModules preprocessor
 */
export type Options = PartialDeep<{
	/*
	* The pattern to use for module naming
	* @see https://lightningcss.dev/css-modules.html
	*/
	moduleNameingPattern: string;

	/*
	* Whether to include the original path in the css module
	* @default true
	*/
	includeOriginalPath: boolean;

	/*
	* Whether to convert the module name to camel case
	* @default true
	*/
	convertToCamelCase: boolean;

	/*
	* Whether to use the object mode or underscore mode
	* underscore mode is tree-shakable
	* @default 'object'
	*
	* @example
	* for object mode
	* ```svelte
	* <script>
	*   import styles from './foo.module.css';
	*   // converted to `const s = { foo: 'foo' }`
	* </script>
	*
	* <div class={styles.foo}></div>
	* ```
	*
	* @example
	* for underscore mode
	* ```svelte
	* <script>
	*   import styles from './foo.module.css';
	*   // converted to `const styles_foo = 'foo'`
	* </script>
	*
	* <div class={styles_foo}></div>
	* ```
	*/
	mode: 'object' | 'underscore';
}>;

export type ResolvedOptions = SetOptional<RequiredDeep<Options>, 'moduleNameingPattern'>;

const defaultOptions = {
	includeOriginalPath: true,
	convertToCamelCase: true,
	mode: 'object',
} as const satisfies ResolvedOptions;

export function resolveOptions(options: Options): Readonly<ResolvedOptions> {
	return defu(options, defaultOptions);
}
