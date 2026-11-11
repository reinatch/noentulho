# No Entulho

A Vue 2 website with a Three.js scene, media galleries, and content loaded through a WordPress REST endpoint. The repository includes the frontend in `src/` and WordPress-related backend code in `back/`.

## Maintenance status

This checkout uses a legacy Vue 2 / Vue CLI 4 stack. Its current maintenance status and deployment relationship have not been confirmed. Treat it as a historical implementation until the owner decides whether to maintain or archive it; this README does not imply that it has been archived on GitHub.

## Local setup

The repository includes an npm lockfile:

```sh
npm ci
npm run serve
```

The historical Node.js runtime is not pinned. Compatibility with current Node.js versions needs verification before promising a reproducible build. `npm run build` compiles the frontend; `npm run lint` invokes the Vue CLI lint task and may fix files. The `deploy` script publishes externally and is not part of local setup.

## Content and dependencies

`src/store/index.js` requests content from `https://art.noentulho.pt/wp-json/no/entulho`. A frontend build alone does not provision that WordPress API. The presence of this endpoint is not verification that the live site runs this exact revision.

`src/views/MainScene.vue` contains the Three.js scene, and `src/views/Home.vue` includes project credits. Preserve those credits and third-party asset terms. GSAP is installed from the public npm registry. No bundled archive or GreenSock registry token is required; GSAP retains its own vendor license.

## If development resumes

First capture a working runtime and visual baseline for navigation, content loading, media, and the 3D scene. Update the toolchain and migrate Vue in separate, testable steps. Audit the embedded WordPress code independently. Broad automatic dependency fixes are unsuitable for this legacy stack.

## GSAP installation

GSAP and its plugins install from the public npm registry using the checked lockfile. No ZIP/TGZ download, Club registry, or GreenSock authentication token is needed. Existing plugin imports and registrations are preserved. GSAP remains subject to its vendor license.
