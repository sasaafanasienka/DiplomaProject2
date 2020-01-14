const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']     //добавили минификацию CSS  
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, 
              disable: true, 
            },
          },
        ],
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 
      filename: 'style.[contenthash].css',
      }),
    new HtmlWebpackPlugin({
      inject: false, //стили не нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после
    }),
    new WebpackMd5Hash()
  ]
};