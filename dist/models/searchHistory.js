const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchHistorySchema = new Schema({
  search_term: {
    type: String,
    required: true
  },
  searched_on: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

const SearchHistory = mongoose.model('Search History', searchHistorySchema);

module.exports = SearchHistory;

