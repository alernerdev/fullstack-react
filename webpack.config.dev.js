import webpack from 'webpack';

export default {
	devtool: 'inline-source-map',
	entry: [
		'./src/index'
	],
	target: 'web',
	output: {
		path: __dirname + '/dist', // physical files are output by the prod build only
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins:[],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
        ]
    }
};
