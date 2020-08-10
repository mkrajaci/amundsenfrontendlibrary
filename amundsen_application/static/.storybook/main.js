const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const customWebpackConfig = require('../webpack.common.ts');

module.exports = {
  stories: ['../js/stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config) => {
    // do mutation to the config

    // TS config from the docs
    // https://storybook.js.org/docs/configurations/typescript-config/
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');

    // Loads Sass files for styling
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: require.resolve('style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            includePaths: ['../css/'],
          },
        },
        // {
        //   loader: require.resolve('sass-loader'),
        // },
      ],
      include: path.resolve(__dirname, '../'),
      // include: path.resolve(__dirname, '../'),
    });
    config.resolve.extensions.push('.css', '.scss');

    // necessary to support dynamic ~ imports (e.g. @import '~shared/variables')
    // otherwise sass-loader cannot find the module to import
    config.resolve.modules.push('../css');

    return config;
  },
};
