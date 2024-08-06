/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
import type { Config as SvelteKitConfig } from '@sveltejs/kit';
import type { AliasOptions, UserConfig as ViteConfig } from 'vite';
import { loadConfig } from 'unconfig';

export async function loadAliases(): Promise<AliasOptions> {
	const { config } = await loadConfig({
		merge: true,
		sources: [
			{
				files: 'svelte.config',
				rewrite: (_config) => {
					const config = _config as SvelteKitConfig;
					return {
						alias: config?.kit?.alias ?? {},
					};
				},
			},
			{
				files: 'vite.config',
				rewrite: (_config) => {
					const config = _config as ViteConfig;
					return {
						alias: config?.resolve?.alias ?? {},
					};
				},
			},
		],
	});
	// eslint-disable-next-line ts/no-unsafe-return
	return config.alias ?? {};
}
