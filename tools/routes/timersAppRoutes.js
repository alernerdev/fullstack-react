'use strict';

import express from 'express';
import path from 'path';
const fs = require('fs');

const SAMPLEDATA = require('../sampleData/timersdata.json');
const DATA_FILE = '../sampleData/timersdata.json';

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
        res.json(SAMPLEDATA);
    })
    .post((req, res) => {
        const newTimer = {
            title: req.body.title,
            project: req.body.project,
            id: req.body.id,
            elapsed: 0,
            runningSince: null,
        };
        SAMPLEDATA.push(newTimer);
        fs.writeFile(DATA_FILE, JSON.stringify(SAMPLEDATA, null, 4), () => {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(SAMPLEDATA);
        });
    })
    .delete((req, res) => {
        console.log("received delete timer cmd on the server side");

        var timers = SAMPLEDATA.reduce((memo, timer) => {
            if (timer.id === req.body.id) {
              return memo;
            } else {
              return memo.concat(timer);
            }
        }, []);
        fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
            res.json({});
        });
    })
    .put((req, res) => {
        SAMPLEDATA.forEach((timer) => {
            if (timer.id === req.body.id) {
                timer.title = req.body.title;
                timer.project = req.body.project;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(SAMPLEDATA, null, 4), () => {
            res.json({});
        });
    });

router.route('/api/timers/start')
    .post((req, res) => {
        SAMPLEDATA.forEach((timer) => {
            if (timer.id === req.body.id) {
              timer.runningSince = req.body.start;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(SAMPLEDATA, null, 4), () => {
            res.json({});
        });
    });

router.route('/api/timers/stop')
    .post((req, res) => {
        SAMPLEDATA.forEach((timer) => {
            if (timer.id === req.body.id) {
              const delta = req.body.stop - timer.runningSince;
              timer.elapsed += delta;
              timer.runningSince = null;
            }
        });
        fs.writeFile(DATA_FILE, JSON.stringify(SAMPLEDATA, null, 4), () => {
            res.json({});
        });
    });

module.exports = router;