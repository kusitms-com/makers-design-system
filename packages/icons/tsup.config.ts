import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/generated/index.ts"],
  format: ["esm", "cjs"],
  sourcemap: true,
  splitting: false,
})
