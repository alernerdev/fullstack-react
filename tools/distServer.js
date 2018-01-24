/* running production deployment out of dist directory */

import express from 'express';
import open from 'open';
import path from 'path';
import compression from 'compression';
const bodyParser = require('body-parser');

const votingAppRouter = express.Router();
const timersAppRouter = express.Router();
const mainAppRouter = express.Router();

const app = express();
const port = 3000;

app.use(compression());
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// __dirname is whatever dir this server is running out of

/*
	no-cache
	no-store
	must-revalidate
*/
app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
  });

app.use("/votingApp", require('./routes/votingAppRoutes'));
app.use("/timersApp", require('./routes/timersAppRoutes'));
app.use("/componentsApp", require('./routes/componentsAppRoutes'));
app.use("/formApp", require('./routes/formAppRoutes'));
app.use("/listapp", require('./routes/listAppRoutes'));
app.use("/basicRoutingApp", require('./routes/basicRoutingAppRoutes'));
app.use("/chatSimpleApp", require('./routes/chatSimpleAppRoutes'));
app.use("/", require('./routes/mainAppRoutes'));

app.listen(port, function(err) {
	if (err) {
		console.log(err); //eslint-disable-line no-console
	}
	else {
		open(`http://localhost:${port}`);
	}
});
