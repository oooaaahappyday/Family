const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: {
	  port: 8080
	},
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		filename: 'index.html',
  		template: './src/index.html'
  	}),
  	new ExtractTextPlugin('styles.css')
  ],

  // Configuration des loaders
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
  }
};