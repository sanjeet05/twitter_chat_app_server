const express = require('express');
const controller = require('../../controllers/tweet.controller');


const router = express.Router();

router.route('/get_search_tweets')
  .post(controller.getSearchTweets);

router.route('/get_tweets')
  .post(controller.getTweets);

module.exports = router;
