import { Plugin } from "vite";

/**
 * Creates a Vite plugin for hot-reloading Webflow templates
 * This plugin enables real-time development by:
 * 1. Loading Webflow configuration from webflow.json
 * 2. Fetching Webflow template content from webflow-ext.com
 * 3. Injecting local development content into the Webflow template
 * 4. Supporting feature flags and API version configuration
 *
 * @returns Vite plugin instance
 */
export default function wfHotReload(): Plugin;
