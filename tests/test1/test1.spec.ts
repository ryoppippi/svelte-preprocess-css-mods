import fs from 'node:fs/promises';
import path from 'node:path';
import { expect, it } from 'vitest';
import { compiler } from '../compiler';

function resolve(file: string) {
	return path.resolve(__dirname, file);
}

it('test1', async () => {
	const filename = resolve('Input.svelte');

	const source = await fs.readFile(filename, 'utf-8');

	const code = await compiler({
		source,
		preprocessOptions: { filename },
	});

	await expect(code).toMatchFileSnapshot('./Output.svelte');
});
