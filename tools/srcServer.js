/*eslint-disable no-console */

import webpack from 'webpack';
import express from 'express';
import config from '../webpack.config.dev';
import open from 'open';
import path from 'path';

const app = express();
const port = 3000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: false,
    publicPath: config.output.publicPath
}));

// __dirname is whatever dir this server is running out of

//app.use('/', routes);

app.get('/', function(req, res) {
	console.log("entered / route. ");
	res.sendFile(path.join(__dirname + '/../src/index.html'));
});

app.get('/timersapp', function(req, res) {
	console.log("entered /timersapp route. ");
	res.sendFile(path.join(__dirname + '/../src/timersapp.html'));
});

app.get('/votingapp', function(req, res) {
	console.log("entered /votingapp route. ");
	res.sendFile(path.join(__dirname + '/../src/votingapp.html'));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	}
	else {
		console.log('App listening on port 3000');
		open(`http://localhost:${port}`);
	}
});
