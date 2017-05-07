/**
 * Created by david on 5/7/17.
 */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const search = require("./models/search");


const app = express();
const Bing = require('node-bing-api')({accKey:'508bb882ec9148f9934543cc9aa76265'});

app.use(bodyParser.json());
app.use(cors());

var api = '/:searchString(*)';

app.get(api, (req, res, next) => {
    var { searchString } = req.params;
    var { offset } = req.query;

    return res.json({
        searchString,
        offset
    });
});


    // const data = new search({
    //     searchVal: searchString,
    //     searchDate: Date
    // });
    //
    //     data.save(function(err){
    //         if(err){
    //             return res.send('Error saving to database');
    //         }
    //     });
    //
    //     return res.json(data);
    // }
    //
    // return res.json({
    //     originalUrl: urlToShorten,
    //     shortenedUrl: "Invalid URL"
    // });


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





app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is up!');
});