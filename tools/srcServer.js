/*eslint-disable no-console */

import webpack from 'webpack';
import express from 'express';
import config from '../webpack.config.dev';
import open from 'open';
import path from 'path';
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: false,
    publicPath: config.output.publicPath
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// __dirname is whatever dir this server is running out of

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
  });

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

const DATA_FILE = path.join(__dirname, '/../src/timersapp/timersdata.json');
app.get('/timersapp/api/timers', (req, res) => {
	console.log("entered /api/timers route. ");
	console.log("data file " + DATA_FILE);
	fs.readFile(DATA_FILE, (err, data) => {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
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
