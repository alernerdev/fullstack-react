'use strict';

import express from 'express';
import path from 'path';
const fs = require('fs');

const DATA_FILE = require('../sampleData/timersdata.json');

const router = express.Router();

router.route('/')
	.get((req, res) => {
        var pageName;
        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/timersapp.html'):
            pageName = path.join(__dirname + '/../../dist/timersapp.html') ;

		console.log("entered /timersapp route. ");
		res.sendFile(pageName);
	});

router.route('/api/timers')
    .get((req, res) => {
        console.log("entered /api/timers route. ");
        res.setHeader('Cache-Control', 'no-cache');
        res.json(DATA_FILE);
    });

module.exports = router;