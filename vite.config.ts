/** @type {import('vite').UserConfig} */
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { plugin as mdPlugin } from 'vite-plugin-markdown';
import dts from 'vite-plugin-dts';

console.log(mdPlugin);

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    mdPlugin(),
  ],
  root: "vuer",
  build: {
    outDir: resolve(__dirname, './dist'),
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: false, // <-- this is the important part
    lib: {
      name: 'vuer',
      entry: {
        "vuer": resolve(__dirname, './vuer/index.tsx'),
        "registry": resolve(__dirname, './vuer/registry.tsx'),
        "html_components/contexts/websocket": resolve(__dirname, './vuer/html_components/contexts/websocket.tsx'),
        "three_components/controls/hands/hands": resolve(__dirname, './vuer/three_components/controls/hands/hands.tsx'),
      },
      formats: [ 'es', 'cjs' ],
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      // These are the libraries that we do not want to include in our bundle.
      external: [
        'react', 'react-dom', 'styled-components',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        },
      },
    },
  },
} satisfies UserConfig);
