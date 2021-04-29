import {onMount} from 'svelte';
import models from '../models/';
import cfg from '../../package.json';

const createDb = async () => {
    // Node shims needed for pouchdb
    window.global = window;
    window.process = {env: {DEBUG: undefined}};
    // Imports are here so they don't run during SSR
    const { createRxDatabase, addRxPlugin } = await import('rxdb');
    // Add plugins
    addRxPlugin(await import('pouchdb-adapter-idb'));
    addRxPlugin(await import('rxdb-utils/dist/observables'));
    addRxPlugin(await import('rxdb-utils/dist/hooks'));
    // Create DB
    const db = await createRxDatabase({
        name: cfg.name,
        adapter: 'idb',
    });
    // Register models
    const collections = await models();
    await db.addCollections(collections);
    // Sync
    const syncURL=`http://${window.location.hostname}:5984/`
    Object.keys(collections).forEach(name => db[name].sync({
        remote: syncURL + name + '/'
    }));

    return db;
}

// DB is shared singleton for now, TODO: implement a db context
let dbPromise;
export const useDb = fn => {
    onMount(() => {
        // Initialize db
        if (!dbPromise) dbPromise = createDb();
        // Execute user function with db
        dbPromise.then(fn);
        // Cleanup db for HMR
        return () => dbPromise.then(db => db.destroy());
    })
}

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
