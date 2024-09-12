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

---

### Important Note

This plugin is intended for **development use only**. Be sure to thoroughly test your final application using the Webflow CLI before deploying it to production.
