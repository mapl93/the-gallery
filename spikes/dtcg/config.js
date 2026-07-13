import fs from 'node:fs';

const buildPath = 'spikes/dtcg/build/';
const sourcePath = 'spikes/dtcg/tokens/core.tokens.json';

const config = {
  usesDtcg: true,
  source: ['spikes/dtcg/tokens/**/*.json'],
  hooks: {
    formats: {
      'the-gallery/dtcg-source': () => `${fs.readFileSync(sourcePath, 'utf8').trim()}\n`
    }
  },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'tg',
      buildPath: `${buildPath}css/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      prefix: 'tg',
      buildPath: `${buildPath}js/`,
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },
    figma: {
      transformGroup: 'js',
      buildPath: `${buildPath}figma/`,
      files: [
        {
          destination: 'tokens.source.dtcg.json',
          format: 'the-gallery/dtcg-source'
        },
        {
          destination: 'tokens.resolved.json',
          format: 'json/nested'
        }
      ]
    },
    swift: {
      transformGroup: 'ios-swift',
      prefix: 'tg',
      buildPath: `${buildPath}swift/`,
      files: [
        {
          destination: 'GalleryTokens.swift',
          format: 'ios-swift/enum.swift',
          options: {
            className: 'GalleryTokens',
            import: ['UIKit']
          }
        }
      ]
    },
    compose: {
      transformGroup: 'compose',
      prefix: 'tg',
      buildPath: `${buildPath}compose/`,
      files: [
        {
          destination: 'GalleryTokens.kt',
          format: 'compose/object',
          options: {
            className: 'GalleryTokens',
            packageName: 'com.thegallery.tokens'
          }
        }
      ]
    }
  }
};

export default config;
