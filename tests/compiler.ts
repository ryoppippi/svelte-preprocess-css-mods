import { preprocess } from 'svelte/compiler';
import { cssModules } from '../src';

type Params = {
	source: string;
	preprocessOptions: Parameters<typeof preprocess>[2];
	cssmodulesOptions?: Parameters<typeof cssModules>[0];
};

export async function compiler({
	source,
	preprocessOptions,
	cssmodulesOptions,
}: Params) {
	const { code } = await preprocess(
		source,
		[cssModules({
			moduleNameingPattern: '[local]_[name]-css-module-test',
			includeOriginalPath: false,
			...cssmodulesOptions,
		})],
		preprocessOptions,
	);

	return code;
};
