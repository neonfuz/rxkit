<script>
 import {onMount} from 'svelte';
 onMount(async () => {
     window.process = {env: {DEBUG: undefined}};
     window.global = window;
     const { createRxDatabase, addRxPlugin } = await import('rxdb');
     addRxPlugin(await import('pouchdb-adapter-idb'));
     const db = await createRxDatabase({
         name: 'sveltekitrxdb',
         adapter: 'idb',
     });
     console.log(db)
 })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
