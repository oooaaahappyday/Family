const path = require('path');
const webpack = require("webpack");
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
  	new ExtractTextPlugin('styles.css'),
  	new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ],

  // Configuration des loaders
  module: {
      rules: [
        {//récupération des fichiers de type css
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {//fix récupération font bootstrap
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
      ]
  }
};