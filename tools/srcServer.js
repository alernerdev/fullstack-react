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

console.log(__dirname);
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
	console.log('path '+ req.path);
	res.sendFile(path.join(__dirname + '/../src/index.html'));
});


app.listen(port, function(err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	}
	else {
		open(`http://localhost:${port}`);
	}
});
