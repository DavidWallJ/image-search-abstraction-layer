/**
 * Created by david on 5/7/17.
 */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const search = require("./models/search");
const mongodb = require("mongodb");

mongoose.Promise = global.Promise;
const app = express();
const Bing = require('node-bing-api')({accKey: '508bb882ec9148f9934543cc9aa76265'});

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bingapp');


const api = '/:searchString(*)';

app.get(api, (req, res, next) => {
    var skip;
    var offset;
    var {searchString} = req.params;


    // for pagination
    if(req.query.offset){
        offset = req.query.offset;
    } else {
        offset = 10;
    }

    if(req.query.skip){
        skip = req.query.skip;
    } else {
        skip = 0;
    }

    // add search string to DB for recent searches option
    const data = new search({
        searchVal: searchString,
        searchDate: new Date()
    });

    console.log(data);

    data.save(err => {
        if(err) {
            next(err);
            res.send('Error saving to database');
        }
    });


    // get bing results
    Bing.images(searchString, {
        top: offset,
        skip: skip
    }, function (error, res2, body) {

        var bingData = [];

        for(var i=0; i < offset; i++){
            bingData.push({
                url: body.value[i].webSearchUrl,
                snippet: body.value[i].name,
                thumbnail: body.value[i].thumbnailUrl,
                context: body.value[i].hostPageDisplayUrl
            });
        }

        res.json(bingData);
    });
});

// return res.json({url: urlToShorten});


// Bing.images("Ninja Turtles", {
//     top: 2,   // Number of results (max 50)
//     skip: 3    // Skip first 3 result
// }, function(error, res, body){
//     app.get("/", function (req, res) {
//
//         res.json(body);
//
//     });
// });


app.listen(PORT, () => {
    console.log('Server is up!');
});