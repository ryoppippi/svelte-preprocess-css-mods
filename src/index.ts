import MagicString from 'magic-string';
import type { PreprocessorGroup } from 'svelte/compiler';
import { findStaticImports } from 'mlly';
import { genObjectFromValues } from 'knitwork';
import { loadAliases } from './utils/alias';
import type { CssModule } from './utils/css-module';
import { getCssModule, getCssModuleImports } from './utils/css-module';

// TODO: improve tree-shaking for production build

export function cssModules(): PreprocessorGroup {
	const cssModuleCache = new Map<string, CssModule[]>();
	return {
		async script({ content, filename }) {
			const aliases = await loadAliases();
			const s = new MagicString(content);

			/* get css/scss module imports */
			const imports = findStaticImports(content).filter(
				i => ['module.css', 'module.scss'].some(ext => i.specifier.endsWith(ext)),
			);

			/* find css/scss module imports */
			const cssModuleImports
				= await getCssModuleImports({
					imports,
					aliases,
					filename,
				});

			/* transform css/scss modules */
			const cssModules = [];
			for (const cmi of cssModuleImports) {
				const cssModule = await getCssModule(cmi);
				cssModules.push(cssModule);

				/* generate css module exports */
				const obj = genObjectFromValues(cssModule.exports);
				const gen = `const ${cmi.defaultImport} = ${obj};\n`;
				s.overwrite(cmi.imp.start, cmi.imp.end, gen);
			}
			if (filename != null) {
				cssModuleCache.set(filename, cssModules);
			}

			return {
				code: s.toString(),
				map: s.generateMap({
					source: filename,
					includeContent: true,
				}),
			};
		},
		style({ content, filename }) {
			const s = new MagicString(content);

			/* if filename is null, it's a svelte component */
			if (filename == null) {
				return { code: content };
			}

			const cssModules = cssModuleCache.get(filename) ?? [];

			/* append css module styles */
			for (const cssModule of cssModules) {
				const code = `
/* ${cssModule.path} */
${cssModule.css}
`;
				s.append(code);
			}

			return {
				code: s.toString(),
				map: s.generateMap({
					source: filename,
					includeContent: true,
				}),
			};
		},
	};
}
