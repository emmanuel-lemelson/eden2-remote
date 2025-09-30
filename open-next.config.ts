import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    cache: {
      mode: "manual",
    },
  },
};

export default config;
