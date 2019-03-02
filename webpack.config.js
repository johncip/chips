const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin } = require('webpack')

const phaserPath = path.join(__dirname, '/node_modules/phaser-ce/')

module.exports = {
  mode: 'development',

  devServer: {
    contentBase: path.join(__dirname, 'assets')
  },

  devtool: 'source-map',

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /pixi\.js$/,
        use: [{ loader: 'expose-loader', options: 'PIXI' }]
      },
      {
        test: /phaser-split\.js$/,
        use: [{ loader: 'expose-loader', options: 'Phaser' }]
      },
      {
        test: /p2\.js$/,
        use: [{ loader: 'expose-loader', options: 'p2' }]
      }
    ]
  },

  resolve: {
    alias: {
      phaser: path.join(phaserPath, 'build/custom/phaser-split.js'),
      pixi: path.join(phaserPath, 'build/custom/pixi.js'),
      p2: path.join(phaserPath, 'build/custom/p2.js')
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets', 'tilemaps', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    new DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
}
