const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'http://localhost:3006/', // Important for Module Federation
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myaccount_app',
      filename: 'remoteEntryMyaccount.js',
      exposes: {
        './Myaccount': './src/App', // Expose the App component
      },
      remotes: {
        containerApp: 'containerApp@http://localhost:3000/remoteEntryContainer.js', // Reference to the host app's remote entry
        sharedApp: 'sharedApp@http://localhost:3009/remoteEntryShared.js', // Reference to the shared app's remote entry
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.1.0' }, // Match container's React version
        'react-dom': { singleton: true, requiredVersion: '^19.1.0' }, // Match container's React version
        'react-router-dom': { singleton: true, requiredVersion: '^7.4.1' }, // Match container's React version or remove if not used.
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3006,
    historyApiFallback: true,
    hot: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow CORS
    },
  },
};