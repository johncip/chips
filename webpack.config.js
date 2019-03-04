const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')
const { DefinePlugin } = require('webpack')

const phaserPath = path.join(__dirname, '/node_modules/phaser-ce/')


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
      Assets: path.resolve(__dirname, 'assets'),
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
