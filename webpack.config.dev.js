import webpack from 'webpack';
import path from 'path';

export default {
	devtool: 'inline-source-map',
	entry: {
        main: path.resolve(__dirname, 'src/index')
    },
	target: 'web',
	output: {
		path: path.resolve(__dirname, '/dist'),
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
