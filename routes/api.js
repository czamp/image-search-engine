"use strict";
const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const SearchHistory = require('../models/searchHistory');

router.get("/search/:term", (req, res, next) => {
    const offset = req.query.offset ? req.query.offset : 1;
    const term = req.params.term;
    const apiString = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI";
    console.log('requesting term ' + term + ' with offset ' + offset);
    // Create a new SearchHistory document
    const search = new SearchHistory({
        search_term: term,
        searched_on: new Date()
    });
    // Save the SearchHistory to the database
    search.save((err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            return
        }
    });

    unirest
        .get(apiString + "?autoCorrect=false&pageNumber=" + offset + "&pageSize=10&q=" + term + "&safeSearch=false")
        .header("X-RapidAPI-Host", process.env.API_HOST)
        .header("X-RapidAPI-Key", process.env.API_KEY)
        .end(result => {

            // Maps urls, thumbnails, and new alt text to a new object
            const data = result.body.value.map((image, i) => {
                return {
                    url: image.url,
                    thumbnail: image.thumbnail,
                    thumbnailHeight: image.thumbnailHeight,
                    thumbnailWidth: image.thumbnailWidth,
                    alt: term + " image number " + i
                };
            });

            // Responds with json of the search result
            res.json(data);
        });
});

router.get("/history", (req, res, next) => {
    SearchHistory.find({}, (err, docs) => {
        if (err) console.log(err);
        res.json(docs);
    })
});

module.exports = router;
