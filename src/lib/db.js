import {onMount} from 'svelte';
import models from '../models/';

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
        // Register models
        await db.addCollections(await models());
        // execute fn with db
        return await fn(db);
    })
);

export const handleChange = item => e => {
    let value = e.target.value;
    switch (e.target.type) {
        case 'number': value = Number(value); break;
        case 'checkbox': value = e.target.checked; break;
    }
    item.atomicPatch({ [e.target.name]: value })
}

export const handleRemove = item => e => {
    e.preventDefault();
    return item.remove();
}
