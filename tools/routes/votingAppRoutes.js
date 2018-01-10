'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

router.route('/')
	.get((req, res) => {
        var pageName;
        console.log("environment is " + process.env['NODE_ENV']);

        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/votingApp.html') : 
            pageName = path.join(__dirname + '/../../dist/votingApp.html');
		
		console.log("entered /votingapp route. ");
		console.log("pageName. " + pageName);
		res.sendFile(pageName);
	});

module.exports = router;