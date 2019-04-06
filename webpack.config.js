const path = require('path')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = {
  mode: 'production',

  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    stats: 'minimal',
    open: true,
    overlay: true
  },

  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|xm|woff)$/,
        use: ['file-loader']
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'assets')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template.html'
    }),
    // TODO: see if tile set works without this
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets', 'tilemaps', '**', '*'),
        to: path.resolve(__dirname, 'dist', 'tilemaps')
      }
    ]),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Inconsolata', subsets: ['latin'] }
      ]
    }),
    new DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
}

const devConfig = {
  devtool: 'eval-source-map',
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(baseConfig, devConfig)
  }

  return baseConfig
}
