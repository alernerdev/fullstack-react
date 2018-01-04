import webpack from 'webpack';
import path from 'path';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
	__DEV__: false
  };

export default {
	devtool: 'source-map',
	entry: {
        main: path.resolve(__dirname, 'src/index')
    },
	target: 'web',
	output: {
		path: path.resolve(__dirname, '/dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	plugins:[
		// Hash the files using MD5 so that their names change when the content changes.
		//new WebpackMd5Hash(),
		// Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new webpack.DefinePlugin(GLOBALS),
		extractCSS,
		// Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
		new HtmlWebpackPlugin({
				//template: 'src/index.ejs',
				favicon: 'src/favicon.ico',
				minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			trackJSToken: ''
		}),
		//  Minify JS
		//new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
	],
    module: {
        rules: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
			{ test: /\.jsx$/, exclude: /node_modules/, loader: ['babel-loader'] },
			//{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
			{
				test: /\.css$/,
                use: extractCSS.extract({
						fallback: "style-loader",
                        use: 'css-loader'
                        // sourceMap setting is ignored when devtool is configured higher up
                        //options: { sourceMap: true }
                })
			},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff'
					}
				}]
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: ['file-loader']
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 6000,
						name: 'src/images/[name].[ext]'
					}
				}]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml'
					}
				}]
			}
        ]
    }
};