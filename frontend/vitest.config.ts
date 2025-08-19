import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"], // or './test/setup.ts'
        globals: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
