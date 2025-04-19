# @xatom/wf-app-hot-reload

Seamless hot reloading for Webflow applications during development.

## Features

- Instant updates: Reflect code changes in your Webflow App without manual reloads.
- Vite plugin: Easy integration with Vite-based workflows.

## Installation

Install as a dev dependency in your project:

```bash
# Yarn
yarn add -D @xatom/wf-app-hot-reload

# PNPM
pnpm install -D @xatom/wf-app-hot-reload
```

## Usage

> **Warning:** This plugin is for **development only**. Do **not** include it in production bundles.
>
> Before deploying, always build and test your App using the Webflow CLI without this plugin.

1. Update your `vite.config.js`:

   ```javascript
   import { defineConfig } from "vite";
   import wfHotReload from "@xatom/wf-app-hot-reload";

   export default defineConfig({
     plugins: [
       wfHotReload(),
       // other plugins...
     ],
   });
   ```

2. Run your development server:

   ```bash
   yarn dev
   # or
   pnpm dev
   ```

Any edits to your source files will now trigger hot reloads in your Webflow App.

## Configuration

No additional setup is required out of the box. The plugin works with your existing Vite configuration.

## License

MIT
