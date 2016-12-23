// set up ======================================================================

var express = require('express');
var app = express(); 						// create our app w/ express
var port = process.env.PORT || 8080; 				// set the port
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');
var Q = require("q");
var pg = require('pg');
var fs = require('fs');
var ytdl = require('ytdl-core');
require('moment/locale/es');

// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(cors());
app.options('*', cors()); // include before other routes

var DB_CONN_STRING = "postgres://postgres@localhost:5432/repo";
console.log("DB_CONN_STRING", DB_CONN_STRING);

// routes ======================================================================

app.get('/api/products', function (req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(DB_CONN_STRING, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM products");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

app.get('/api/download/:videoId', function (req, res) {
    var videoId = req.params.videoId;
    try {
        res.setHeader("Content-disposition", "attachment; filename=download_" + videoId + ".mp4");
        res.setHeader('Content-type', 'video/mpeg');

        ytdl('http://www.youtube.com/watch?v=' + videoId)
            .pipe(res);
        //.pipe(fs.createWriteStream(videoId + '.flv'));

    } catch (error) {
        console.log("------------------ error in " + videoId + "  = " + JSON.stringify(error, null, 2));
        res.status(500).json({success: false, data: error});
    }

    console.log("------------------ downloading DONE " + videoId);

    //return res.json({});
});

// application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);
