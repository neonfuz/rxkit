# RxKit

RxDB + SvelteKit

The purpose of this repo is to create a base based on SvelteKit to explore how to best interface RxDB with Svelte. It is the continuation of [RxSapper](https://github.com/neonfuz/rxsapper). Feedback is welcome! The goal is to eventually build a stable base but it is not yet "production ready".

# Create a project

``` bash
npx degit neonfuz/rxkit project_name
cd project_name
yarn
```

## Developing

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
