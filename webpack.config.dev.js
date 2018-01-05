import webpack from 'webpack';
import path from 'path';

export default {
	devtool: 'inline-source-map',
	entry: {
        main: path.resolve(__dirname, 'src/index'),
        votingapp: path.resolve(__dirname, 'src/voting/index'),
        timersapp: path.resolve(__dirname, 'src/timers/index')
    },
	target: 'web',
	output: {
		path: path.resolve(__dirname, '/dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	plugins:[
	],
    module: {
        rules: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
			{ test: /\.jsx$/, exclude: /node_modules/, loader: ['babel-loader'] },
			{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
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
						name: 'src/**/images/[name].[ext]'
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
