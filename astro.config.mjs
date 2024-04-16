import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  integrations: [playformCompress()],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});