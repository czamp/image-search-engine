const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSuggestions = new Schema({
  user: {
    type: String,
    required: true
  },
  userSearches: [String]
});

const SearchSuggestions = mongoose.model('Search Suggestions', searchSuggestions);

module.exports = SearchSuggestions;