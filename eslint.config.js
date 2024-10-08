import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: true,
	ignores: ['tests/**/*.svelte'],
	typescript: {
		tsconfigPath: './tsconfig.json',
		overrides: {
			'import/no-extraneous-dependencies': ['error'],
		},
	},
});
