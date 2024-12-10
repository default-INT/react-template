const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const localIdentName = isEnvDevelopment ? '[path][name]__[local].[ext]'
  : '[name]-[contenthash].[ext]';

module.exports = env => ({
  mode: isEnvDevelopment ? 'development' : 'production',
  entry: './src/index.ts',
  devtool: isEnvProduction ? false : 'inline-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'sources/[name].[contenthash].js',
    assetModuleFilename: 'sources/[contenthash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                localIdentName,
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        issuer: filename => !filename || /\.[jt]sx?$/.test(filename),
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: 'sources/[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.s?css$/,
        type: 'asset/resource',
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
      },
      {
        test: /\.obj$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: !isEnvDevelopment,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'initial',
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
    concatenateModules: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.svg', '.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/template.html'),
      REACT_APP_TYPE: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_TYPE: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/public/favicon.ico'), to: 'sources/' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'sources/[name].[contenthash].css',
    }),
  ],
  devServer: {
    proxy: [
      {
        context: ['/'],
        target: env?.proxy || '',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    ],
    port: 3000,
    static: { directory: path.join(__dirname, 'dist'), serveIndex: true },
    devMiddleware: {
      index: true,
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    },
    hot: false,
    liveReload: false,
    historyApiFallback: true,
    compress: true,
    client: { overlay: { errors: true, warnings: false } },
  },
});
