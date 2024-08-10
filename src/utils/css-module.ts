import { readFile } from 'node:fs/promises';
import camelcaseKeys from 'camelcase-keys';
import { transform } from 'lightningcss';
import MagicString from 'magic-string';
import type { StaticImport } from 'mlly';
import { parseStaticImport, pathToFileURL, resolvePath } from 'mlly';
import { stringToUint8Array, uint8ArrayToString } from 'uint8array-extras';
import { betterr } from 'betterr';
import { withTrailingSlash } from 'ufo';
import type { ResolvedOptions } from '../options';

type getCssModuleImportsProps = {
	imports: StaticImport[];
	aliases: Record<string, string>;
	filename?: string;
};

type ResolvedModuleImport = {
	path: string;
	defaultImport: string;
	imp: StaticImport;
};

export async function getCssModuleImports(
	{
		imports,
		aliases,
		filename,
	}: getCssModuleImportsProps,
): Promise<ResolvedModuleImport[]> {
	const cssModules = await Promise.all(imports.map(async (imp) => {
		const {
			specifier,
			defaultImport,
		} = parseStaticImport(imp);

		if (defaultImport == null) {
			throw new Error(`Default import is required for css modules: ${specifier}`);
		}

		const aliasKey = Object.keys(aliases).find(a => specifier.startsWith(withTrailingSlash(a)) || specifier === a);
		if (aliasKey != null) {
			const alias = aliases[aliasKey];
			const s = new MagicString(specifier);
			s.overwrite(0, aliasKey.length, alias);
			return { path: s.toString(), defaultImport, imp };
		}

		const { err, data: resolved } = await betterr(async () => resolvePath(specifier, {
			url: filename == null ? undefined : pathToFileURL(filename),
		}));

		if (err != null) {
			console.error(err.message);
			return undefined;
		}

		return { path: resolved, defaultImport, imp };
	}));

	return cssModules.filter(i => i != null);
}

export type CssModule = {
	css?: string;
	exports: Record<string, string>;
} & ResolvedModuleImport;

export async function getCssModule({ path, ...rest }: ResolvedModuleImport, options: ResolvedOptions): Promise<CssModule> {
	const { moduleNameingPattern: pattern } = options;
	const { err, data: code } = await betterr(async () => readFile(path, { encoding: 'utf-8' }));

	if (err != null) {
		console.error(`Failed to read css module: ${path}`);
		return { css: undefined, exports: {}, path, ...rest };
	}

	const { code: _css, exports: _exports } = transform({
		code: stringToUint8Array(code),
		cssModules: pattern != null ? { pattern } : true,
		minify: false,
		sourceMap: false,
		filename: path,
	});

	const css = uint8ArrayToString(_css);

	if (_exports == null) {
		return { css, exports: {}, path, ...rest };
	}

	const __exports: Record<string, string> = {};
	for (const [key, value] of Object.entries(_exports)) {
		__exports[key] = value.name;
	}
	const exports = options.convertToCamelCase ? camelcaseKeys(__exports) : __exports;

	return { css, exports, path, ...rest };
}
