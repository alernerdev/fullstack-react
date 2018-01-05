import fs from 'fs';
import path from 'path';

// allows to interact with in-memory DOM using jQuery selectors
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

writeHTMLFile('../src/index.html', 'dist/index.html', 'prod version of index.html written to /dist');
writeHTMLFile('../src/timersApp.html', 'dist/timersApp.html', 'prod version of timersApp.html written to /dist');
writeHTMLFile('../src/votingApp.html', 'dist/votingApp.html', 'prod version of votingApp.html written to /dist');

function writeHTMLFile(sourceFile, destFile, message) {
	fs.readFile(path.resolve(__dirname, sourceFile), 'utf8', (err, markup) =>{
		if (err) {
			return console.log(err);
		}

		const $ = cheerio.load(markup);

		// dynamically inserts stylesheet name into HTML since a separate stylesheet is only used
		// for production builds.  For dev, CSS is inline.
		//$('head').prepend('<link rel="stylesheet" href="main.bundle.css">');
		fs.writeFile(destFile, $.html(), 'utf8', function(err) {
			if (err) {
				return console.log(err);
			}
			console.log(message);
		});
	});
}
