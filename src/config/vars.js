// const path = require('path');

// // import .env variables
// require('dotenv-safe').load({
//   path: path.join(__dirname, '../../.env'),
//   sample: path.join(__dirname, '../../.env.example'),
// });

// module.exports = {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   jwtSecret: process.env.JWT_SECRET,
//   jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
//   mongoBaseUri: process.env.MONGO_BASE_URI,
//   mongo: {
//     uri: process.env.NODE_ENV === 'test'
//       ? process.env.MONGO_URI_TESTS
//       : process.env.MONGO_URI,
//   },
//   logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
// };

/*
* new code modifications
*/

const env = process.env.NODE_ENV || 'development';
const JWT_EXPIRATION_MINUTES = 10080; // 7 days

const development = {
  env,
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: JWT_EXPIRATION_MINUTES,
  port: process.env.PORT || 3100,
  mongo: {
    uri: 'mongodb://localhost:27017/richpanel-dev',
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

  twitterConfig: {
    consumerKey: 'o0IvmL8wa7vYXsLgoQS6WZm6B',
    consumerSecret: 'xLJ1o6b0PPuDwR7hwEu4SqzRFNrasSWmNnaXna4el9XI23swdn',
    callback: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/home' : null,
  },
};


const production = {
  env,
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: JWT_EXPIRATION_MINUTES,
  port: process.env.PORT || 3100,
  mongo: {
    uri: 'mongodb://sanjeet05:sanjeet#123@ds133622.mlab.com:33622/twitter_chat_app',
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

  twitterConfig: {
    consumerKey: 'o0IvmL8wa7vYXsLgoQS6WZm6B',
    consumerSecret: 'xLJ1o6b0PPuDwR7hwEu4SqzRFNrasSWmNnaXna4el9XI23swdn',
    callback: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/home' : null,
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
