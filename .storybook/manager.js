import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: './icon.svg',
    brandTitle: 'Ibrahim Shaik Components',
    brandUrl: 'brandUrl: https://ibrahim-portfolio.pages.dev/',
  },
  
}); 

