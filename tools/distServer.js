/* running production deployment out of dist directory */

import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';

const app = express();
const port = 3000;

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../dist/index.html'));
});


app.listen(port, function(err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	}
	else {
		open(`http://localhost:${port}`);
	}
});
