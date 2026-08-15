import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://collective-dreamer.com/",
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()]
  }
});
