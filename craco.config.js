const { whenDev } = require('@craco/craco')
const CracoAlias = require('craco-alias')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        /* tsConfigPath should point to the file where "paths" are specified */
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: whenDev(() => webpackConfig.entry, {
          main: paths.appIndexJs,
          /**
           * These two lines have been added to create two more files in the build folder.
           */
          content: './src/contentScript/index.ts',
          background: './src/background/index.ts',
        }),
        output: {
          ...webpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        plugins: [
          ...webpackConfig.plugins.filter(
            (plugin) => !(plugin instanceof HtmlWebpackPlugin)
          ),
          /**
           * This plugin inject all js file created. However, as `content.jsù and `background.js` should not be executed on the popup
           * their injection is prevent here.
           */
          new HtmlWebpackPlugin({
            inject: false,
            template: './public/index.html',
            minify: true,
          }),
        ],
      }
    },
  },
}
