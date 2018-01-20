'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

/* eslint-disable no-console */

router.route('/')
	.get((req, res) => {
        let pageName;
        (process.env['NODE_ENV'] == 'development') ?
            pageName = path.join(__dirname + '/../../src/index.html'):
            pageName = path.join(__dirname + '/../../dist/index.html');

        console.log("entered / route. ");
        res.sendFile(pageName);
    });

module.exports = router;

