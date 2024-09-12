import path from "path";
import fs from "fs";

/**
 * vite plugin
 */

const wfHotReload = () => {
  let webflowHTML = "";
  //load webflow config content
  const configContent = fs
    .readFileSync(path.join("./webflow.json"))
    .toString();

  return {
    name: "webflow-hot-reload-server",
    transformIndexHtml: async (html) => {
      const webflowConfig = JSON.parse(configContent);
      const _name = webflowConfig.name;
      //default template set to v1
      let template = "/template";
      let flagQuery = "";

      //set template v2 if api version is 2
      if (
        webflowConfig.apiVersion &&
        webflowConfig.apiVersion === "2"
      ) {
        template = "/template/v2";
      }

      //add feature flags query parameters if exists in config file
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

      if (webflowHTML.length === 0) {
        //fetch webflow template content
        webflowHTML = await (
          await fetch(
            `https://webflow-ext.com${template}?name=${_name}${flagQuery}`
          )
        ).text();
      }

      //replace {{ui}} in webflow template with current html content
      const _finalHTML = webflowHTML.replace(
        `{{ui}}`,
        html
      );
      return _finalHTML;
    },
    configureServer(server) {
      //add middleware to handle webflow.json request
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
