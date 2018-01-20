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
            pageName = path.join(__dirname + '/../../src/votingApp.html') :
            pageName = path.join(__dirname + '/../../dist/votingApp.html');

		console.log("entered /votingapp route. ");
		res.sendFile(pageName);
	});

module.exports = router;
