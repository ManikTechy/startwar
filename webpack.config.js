var path = require('path');
var webpack = require('webpack');
var Uglify = require("uglifyjs-webpack-plugin"); 

 var plugins = [];
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false,minimize: true }));
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push( new Uglify({
            sourceMap: true,
            uglifyOptions: {
                output: {
                    beautify: false, // comment out or set to false for production
                },
            },
        }));
  plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}));

module.exports = {
  entry: './private/views/Layout',
  devtool: "source-map",
  output: { path: __dirname, filename: './public/assets/js/bundle.js' },
  resolve: {
          extensions: ['', '.js', '.jsx']
        },
         plugins: plugins,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
        
      }
    ]
  },
};
