## Enabling Hot Reloading in Your Webflow Application

### Installation

To add the hot reloading feature, use one of the following commands:

With Yarn:

```bash
yarn add -D @xatom/wf-app-hot-reload
```

With PNPM:

```bash
pnpm install -D @xatom/wf-app-hot-reload
```

### Usage

> [!WARNING]  
> This plugin is intended for **development use only**. Be sure to thoroughly test your final App using the Webflow CLI before deploying it to production.
> **Do not run this plugin when bundling your App.**

After installation, update your `vite.config.js` to include the `@xatom/wf-app-hot-reload` plugin.

```javascript
import wfHotReload from "@xatom/wf-app-hot-reload";

export default defineConfig({
  plugins: [
    ...,
    wfHotReload(),
  ],
});
```


