const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')
const { DefinePlugin } = require('webpack')


module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'assets'),
    stats: 'minimal'
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
    // TODO: is this needed?
    new DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
}
