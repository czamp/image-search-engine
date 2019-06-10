"use strict";
const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const request = require("request");
const SearchHistory = require("../models/searchHistory");

router.get("/search/:term", (req, res, next) => {
    // API call parameters
  let key = process.env.BING_KEY;
  let host = "api.cognitive.microsoft.com";
  let path = "/bing/v7.0/images/search";
  let term = req.params.term;
  let safeSearch = req.query.safeSearch;
  let count = 20;
  let offset = req.query.offset * count - count;

  // ensures that if a query does not contain the optional params, the search will still return results
  if (safeSearch === undefined) { safeSearch = 'off'};
  if (isNaN(offset)) { offset = 0};
  console.log('safeSearch:' + safeSearch);
  console.log('offset: ' + offset);


  // Create document for SearchHistory model
  // const search = new SearchHistory({
  //   search_term: term,
  //   searched_on: new Date()
  // });

  SearchHistory.findOneAndUpdate({search_term: term},{searched_on: new Date()}, (err, doc) => {
    if (!err) {
      if (!doc) {
        doc = new SearchHistory({search_term: term, searched_on: new Date()})
      }
      doc.save(err => {
        if(err) {console.log(err)}
      })
    }
  })

  // Save the SearchHistory to the database
  // search.save((err, doc) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     return;
  //   }
  // });

  unirest
    .get("https://" + host + path + "?q=" + term + "&count=" + count + "&offset=" + offset + "&safeSearch=" + safeSearch)
    .header("Ocp-Apim-Subscription-Key", key)
    .header("Host", host)
    .end(result => {
      let searchResults = result.body.value.map((image, i) => {
        return {
          url: image.hostPageUrl,
          image: image.contentUrl,
          alt: image.name,
          thumbnail: image.thumbnailUrl,
          thumbnailHeight: image.thumbnail.height,
          thumbnailWidth: image.thumbnail.width
        };
      });
      let numPages = Math.floor(result.body.totalEstimatedMatches / count);
      console.log(numPages + " pages found");
      res.json({ searchResults: searchResults, pages: numPages });
    });
});

router.get("/history", (req, res, next) => {
 SearchHistory.find({}).sort("searched_on").exec((err, docs) => {
   if(err) console.log(err);
   res.json(docs);
 })
});

module.exports = router;
