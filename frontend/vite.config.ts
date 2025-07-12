import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), reactNativeWeb()],
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
      'react-native-share': './__mocks__/react-native-share/index.js',
      'react-native-fs': './__mocks__/react-native-fs/index.js',
      'shaka-player': './__mocks__/shaka-player/index.js',
      
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
        '.tsx': 'tsx',
      },
      jsx: 'automatic',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  server: {
    mimeTypes: {
      'application/javascript': ['.tsx', '.jsx'],
    },
    fs: {
      strict: false,
    },
  },
});
