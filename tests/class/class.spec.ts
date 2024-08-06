import fs from 'node:fs/promises';
import path from 'node:path';
import { expect, it } from 'vitest';
import { compiler } from '../compiler';

export function resolve(file: string) {
	return path.resolve(__dirname, file);
}

it('load css module for class', async () => {
	const filename = resolve('Input.svelte');

	const source = await fs.readFile(filename, 'utf-8');

	const code = await compiler({
		source,
		preprocessOptions: { filename },
	});

	await expect(code).toMatchFileSnapshot('./Output.svelte');
});
