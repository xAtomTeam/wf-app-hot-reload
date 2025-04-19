import path from "path";
import fs from "fs";

/**
 * Vite plugin for hot-reloading Webflow templates
 *
 * This plugin enables real-time development by:
 * 1. Loading Webflow configuration from webflow.json
 * 2. Fetching Webflow template content from webflow-ext.com
 * 3. Injecting local development content into the Webflow template
 * 4. Supporting feature flags and API version configuration
 */

const wfHotReload = () => {
  // Cache for storing fetched Webflow HTML template
  let webflowHTML = "";

  // Read and parse the webflow.json configuration file
  // This file contains project name, API version, and feature flags
  const configContent = fs
    .readFileSync(path.join("./webflow.json"))
    .toString();

  return {
    name: "webflow-hot-reload-server",

    /**
     * Transform the development HTML before serving
     * @param {string} html - The original HTML content from the development build
     * @returns {Promise<string>} - The transformed HTML with Webflow template integration
     */
    transformIndexHtml: async (html) => {
      const webflowConfig = JSON.parse(configContent);
      const _name = webflowConfig.name;

      // Template path configuration based on API version
      // v1 is default, v2 has a different template endpoint
      let template = "/template";
      let flagQuery = "";

      // Configure template endpoint for API v2 if specified
      if (
        webflowConfig.apiVersion &&
        webflowConfig.apiVersion === "2"
      ) {
        template = "/template/v2";
      }

      // Process feature flags from config and build query parameters
      // Supports both enabling (ff_on) and disabling (ff_off) features
      if (webflowConfig.featureFlags) {
        Object.keys(webflowConfig.featureFlags).forEach(
          (key) => {
            if (webflowConfig.featureFlags[key]) {
              flagQuery = `${flagQuery}&ff_on=${key}`;
            } else {
              flagQuery = `${flagQuery}&ff_off=${key}`;
            }
          }
        );
      }

      // Fetch Webflow template if not already cached
      if (webflowHTML.length === 0) {
        webflowHTML = await (
          await fetch(
            `https://webflow-ext.com${template}?name=${_name}${flagQuery}`
          )
        ).text();
      }

      // Inject the development HTML content into the Webflow template
      // Replaces the {{ui}} placeholder with current development content
      const _finalHTML = webflowHTML.replace(
        `{{ui}}`,
        html
      );
      return _finalHTML;
    },

    /**
     * Configure development server middleware
     * @param {import('vite').ViteDevServer} server - Vite dev server instance
     */
    configureServer(server) {
      // Add middleware to serve webflow.json configuration
      // This endpoint is used by the Webflow extension to read project config
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/__webflow") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
            "Access-Control-Allow-Headers",
            "*"
          );
          res.write(configContent, "utf-8");
          res.end();
        } else {
          next();
        }
      });
    },
  };
};

export default wfHotReload;
