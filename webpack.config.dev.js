import webpack from 'webpack';
import path from 'path';

process.env['NODE_ENV'] = 'development';

export default {
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, "src"),
	entry: {
		mainapp: './mainapp/index.js',
		votingapp: './votingapp/index.js',
        timersapp: './timersapp/index.js',
        componentsapp: './componentsapp/index.js',
        formapp: './formapp/index.js'
    },
	target: 'web',
	output: {
		// absolute path
		path: path.resolve(__dirname, 'dist'),
		// this is whats used by HTML files when specifying path
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	plugins:[
	],

    module: {
        rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "tools"),
					path.resolve(__dirname, "test"),
					path.resolve(__dirname, 'node_modules/uid-generator') // this pkg was written in ES6
				],
				loaders: ['babel-loader']
			},
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
						name: 'images/[name].[ext]'
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
