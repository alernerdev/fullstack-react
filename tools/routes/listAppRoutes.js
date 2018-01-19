'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

router.route('/')
	.get((req, res) => {
        var pageName;
        console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/listApp.html') :
            pageName = path.join(__dirname + '/../../dist/listApp.html');

		console.log("entered /listapp route. ");
		res.sendFile(pageName);
	});

module.exports = router;