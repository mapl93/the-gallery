import StyleDictionary from 'style-dictionary';

const config = {
  source: ['tokens/**/*.json'],
  platforms: {

    // Shopify — CSS custom properties
    shopify: {
      transformGroup: 'css',
      prefix: 'tg',
      buildPath: 'platforms/shopify/assets/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },

    // Framer — ES6 JS module
    framer: {
      transformGroup: 'js',
      prefix: 'tg',
      buildPath: 'platforms/framer/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },

    // Webflow — CSS custom properties
    webflow: {
      transformGroup: 'css',
      prefix: 'tg',
      buildPath: 'platforms/webflow/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    }

  }
};

export default config;
