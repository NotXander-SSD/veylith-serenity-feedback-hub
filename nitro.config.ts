import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  presets: ["netlify"],
  output: {
    dir: ".output",
    publicDir: ".output/public",
  },
});
