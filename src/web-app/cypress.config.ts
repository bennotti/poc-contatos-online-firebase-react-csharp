import { defineConfig } from "cypress";
import { devServer } from "@cypress/vite-dev-server";

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      const settings = devServer({
        ...devServerConfig,
        framework: "react",
        viteConfig: require("./vite.config.js"),
      });
      return {
        port: 3000,
        ...settings
      };
    },
  },
  defaultCommandTimeout: 30000,
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
