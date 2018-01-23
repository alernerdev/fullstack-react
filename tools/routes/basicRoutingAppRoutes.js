'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

/* eslint-disable no-console */

router.route('/')
	.get((req, res) => {
        let pageName;
        console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/basicRoutingApp.html') :
            pageName = path.join(__dirname + '/../../dist/basicRoutingApp.html');

		console.log("entered /basicroutingapp route. ");
		res.sendFile(pageName);
	});

router.route('/atlantic')
    .get((req, res) => {
        let pageName;
		console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/basicRoutingApp.html') :
            pageName = path.join(__dirname + '/../../dist/basicRoutingApp.html');

		console.log(`entered /atlantic route -- SHULDNT BE HITING THE SERVER. `);
		res.sendFile(pageName);
	});

	router.route('/pacific')
    .get((req, res) => {
        let pageName;
		console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/basicRoutingApp.html') :
            pageName = path.join(__dirname + '/../../dist/basicRoutingApp.html');

		console.log(`entered /pacific route -- SHULDNT BE HITING THE SERVER. `);
		res.sendFile(pageName);
	});

module.exports = router;
