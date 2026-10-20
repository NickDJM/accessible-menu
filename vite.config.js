import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          server: {
            deps: {
              // Keep Core imports on the same module instance in source and tests.
              inline: [/@accessible-ecosystem\/core/],
            },
          },
          environment: "jsdom",
          environmentOptions: {
            pretendToBeVisual: true,
          },
          include: ["tests/**/*.unit.{test,spec}.{js,ts,jsx,tsx}"],
        },
      },
    ],
  },
});
