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

    // config.module.rules.push({
    //   test: /\.(sa|sc|c)ss$/,
    //   use: [
    //     MiniCssExtractPlugin.loader,
    //     'css-loader',
    //     {
    //       loader: 'sass-loader',
    //       options: {
    //         includePaths: path.join(__dirname, '/css/'),
    //       },
    //     },
    //   ],
    // });
    // config.resolve.extensions.push('.css', '.scss');

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
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
            includePaths: path.join(__dirname, '../css/'),
            javascriptEnabled: true,
          },
        },
      ],
      // use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../css/'),
    });
    config.resolve.extensions.push('.css', '.scss');

    // return {
    //   ...config,
    //   module: {
    //     ...config.module,
    //     rules: customWebpackConfig.module.rules
    //   }
    // };

    return config;
  },
};
