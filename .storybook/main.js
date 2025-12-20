import { mergeConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.js',
      },
    },
  },

  docs: {
    autodocs: 'tag',
  },

  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      plugins: [
        jsconfigPaths(), // ✅ THIS IS THE MISSING PIECE
      ],

      assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],

      build: {
        assetsInlineLimit: 1024,
      },
    });
  },
};

export default config;
