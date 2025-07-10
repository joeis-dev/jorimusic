import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitePluginFlow from 'vite-plugin-flow';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), vitePluginFlow(), reactNativeWeb()],
  define: {
    // Define global variables expected by some React Native packages
    global: 'window',
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    DEV: JSON.stringify(process.env.NODE_ENV === 'development'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.tsx',
      '.web.ts',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.web.js',
      '.js',
      '.css',
      '.json',
      '.mjs',
    ],
    alias: {
      'react-native-share': '/app/__mocks__/react-native-share/index.js',
      'react-native-fs': '/app/__mocks__/react-native-fs/index.js',
      'shaka-player': '/app/__mocks__/shaka-player/index.js',
      '@react-native-async-storage/async-storage': '/app/__mocks__/@react-native-async-storage/async-storage/index.js',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        '.web.tsx',
        '.tsx',
        '.web.ts',
        '.ts',
        '.web.jsx',
        '.jsx',
        '.web.js',
        '.js',
        '.css',
        '.json',
        '.mjs',
      ],
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    },
  },
});
