# svelte-preprocess-css-modules

[![npm version](https://img.shields.io/npm/v/svelte-preprocess-css-modules?color=yellow)](https://npmjs.com/package/svelte-preprocess-css-modules)
[![npm downloads](https://img.shields.io/npm/dm/svelte-preprocess-css-modules?color=yellow)](https://npmjs.com/package/svelte-preprocess-css-modules)

Successor of [svelte-preprocess-cssmodules](https://github.com/micantoine/svelte-preprocess-cssmodules)

## Installation

```bash
npx nypm add -D svelte-preprocess-css-modules
```

## Usage

### Config

```javascript
// svelte.config.js

import cssModules from 'svelte-preprocess-css-modules';

export default {
	preprocess: cssModules({/* options */}),
};
```

See [options](./src/options.ts) for more information.

### Svelte

```svelte
<!-- App.svelte -->
<script>
	import styles from './App.module.css';
</script>

<div class={styles.container}>
	<h1 class={styles.title}>Hello World!</h1>
</div>
```

```css
/* App.module.css */
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.title {
	color: red;
}
```

get converted into:

```svelte
<script>
	const styles = {
		container: 'App_module_container',
		title: 'App_module_title',
	};
</script>

<div class={styles.container}>
	<h1 class={styles.title}>Hello World!</h1>
</div>

<style>
  .App_module_container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .App_module_title {
    color: red;
  }
</style>
```

## License

[MIT](./LICENSE)
