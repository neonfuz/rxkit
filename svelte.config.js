/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			rollupInputOptions: {
				allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils']
			}
		}
	}
};

export default config;
