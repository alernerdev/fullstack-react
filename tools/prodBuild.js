/* this is a build script, so console output is fine */
/*eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production'; // if we are using hot reloading for dev,
// this assures that Babel dev config doesnt apply

console.log("generating minimfied bundle for production via webpack.  Hold on ....".yellow);

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		console.log(err.bold.red);
		return 1;
	}

	const jsonStats = stats.toJson();
	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(error.red));
	}
	if (jsonStats.hasWarnings) {
		console.log('webpack has generated the following warnings'.bold.yellow);
		jsonStats.warnings.map(warning => console.log(warning.yellow));
	}
	console.log(`webpack stats: ${stats}`);

	// if got this far, the build succeeded
	console.log('your app has been compiled in production mode and written to /dist'.green);
	return 0;
});

