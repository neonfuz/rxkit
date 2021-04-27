import {onMount} from 'svelte';

export const useDb = fn => (
    // Browser only
    onMount(async () => {
        // Shims
        window.global = window;
        window.process = {env: {DEBUG: undefined}};
        // Browser only imports
        const {
            createRxDatabase,
            addRxPlugin,
        } = await import('rxdb');
        // RxDB Plugins
        addRxPlugin(await import('pouchdb-adapter-idb'));
//        addRxPlugin(await import('rxdb-utils/dist/observables'));
//        addRxPlugin(await import('rxdb-utils/dist/hooks'));
        // Create DB
        const db = await createRxDatabase({
            name: 'rxkit',
            adapter: 'idb',
        });
        // execute fn with db
        return await fn(db);
    })
);
