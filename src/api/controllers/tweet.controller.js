const Tweet = require('../models/tweet.model');

const { SEARCH_TWEET, TWEET } = require('../constants/tweetMock');

exports.getSearchTweets = async (req, res, next) => {
  try {
    return res.json(SEARCH_TWEET);
  } catch (error) {
    return next(error);
  }
};

exports.getTweets = async (req, res, next) => {
  try {
    
    const chatList = await Tweet.find({ twid: req.body.twid }, 'twid active author avatar body date screenname', { limit: 30 }).sort({ date: 'asc' });
    
    return res.json(chatList);
  } catch (error) {
    return next(error);
  }
};
