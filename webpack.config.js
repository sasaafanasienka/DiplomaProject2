const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: './src/index.js',
           about: './src/about.js',
           analytics: './src/analytics.js'},
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
        test: /\.css$/i,
          use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                {
                        loader: 'image-webpack-loader',
                        options: {}
                },
        ]
       },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
      }),

    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      inject: false, //стили не нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после
    }),
    new HtmlWebpackPlugin({
      inject: false, //стили не нужно прописывать внутри тегов
      template: './src/about.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'about.html' // имя выходного файла, то есть того, что окажется в папке dist после
    }),
    new HtmlWebpackPlugin({
      inject: false, //стили не нужно прописывать внутри тегов
      template: './src/analytics.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'analytics.html' // имя выходного файла, то есть того, что окажется в папке dist после
    })
  ]
};