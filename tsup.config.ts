import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry file(s)
  format: ['cjs', 'esm'],  // Output formats (CommonJS and ES Modules)
  dts: true,               // Generate type definitions
  clean: true,             // Clean the output directory before building
  minify: true,            // Minify the output (optional)
});