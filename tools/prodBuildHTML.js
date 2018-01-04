import fs from 'fs';
import path from 'path';

// allows to interact with in-memory DOM using jQuery selectors
import cheerio from 'cheerio';

import colors from 'colors';

/* eslint-disable no-console */

fs.readFile(path.resolve(__dirname, '../src/index.html'), 'utf8', (err, markup) =>{
	if (err) {
		return console.log(err);
	}

	const $ = cheerio.load(markup);

	// dynamically inserts stylesheet name into HTML since a separate stylesheet is only used
	// for production builds.  For dev, CSS is inline.
	$('head').prepend('<link rel="stylesheet" href="main.bundle.css">');
	fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
		if (err) {
			return console.log(err);
		}
		console.log('prod version of index.html written to /dist'.green);
	});
});
