import type { Config as SvelteKitConfig } from '@sveltejs/kit';
import type { UserConfig as ViteConfig } from 'vite';
import { loadConfig } from 'unconfig';
import { withTrailingSlash } from 'ufo';

export async function loadAliases(): Promise<Record<string, string>> {
	const { config } = await loadConfig({
		merge: true,
		sources: [
			{
				files: 'svelte.config',
				rewrite: (_config) => {
					const config = _config as SvelteKitConfig;
					return { alias: config?.kit?.alias };
				},
			},
			{
				files: 'vite.config',
				rewrite: (_config) => {
					const config = _config as ViteConfig;
					return { alias: config?.resolve?.alias };
				},
			},
		],
	});
	const _alias = config?.alias ?? {};

	const alias: Record<string, string> = {};

	for (const [key, value] of Object.entries(_alias)) {
		if (typeof value === 'string' && typeof key === 'string') {
			alias[key] = withTrailingSlash(value);
		}
	}

	return alias;
}
