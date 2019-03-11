const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        test: /\.(png|jpg|xm)$/,
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
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Lato', subsets: ['latin'] }
      ]
    }),
    new DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
}
