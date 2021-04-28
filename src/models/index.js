// Combine all models into a single object
export default async () => {
    // Import all models
    const models = await import.meta.glob('./*.js')
    // Ignore this file
    const paths = Object.keys(models).filter(path => path !== './index.js');
    // Convert paths to object keys
    const keys = paths.map(key => key.replace(/\.\/(.*)\.js/, '$1'));
    // Await all values
    const vals = await Promise
          .all(paths.map(path => models[path]()))
          .then(vals => vals.map(val => val.default))
    // Combine keys and vals into single object
    return keys
        .map((key,i) => ({[key]: vals[i]}))
        .reduce((a,b)=>({...a,...b}), {});
}
