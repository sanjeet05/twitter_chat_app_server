// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// for tweets
const Tweet = require('./api/models/tweet.model');

// open mongoose connection
mongoose.connect();

// socket
const socketIO = require('socket.io');

// listen to requests
const server = app.listen(port, () => {
  console.info(`server started on port ${port} (${env})`);
});


/**
* Exports express
* @public
*/
module.exports = app;


// ****socket*****
// This creates our socket using the instance of the server
const io = socketIO(server);
io.set('origins', '*:*');

const users = [];
// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
  console.log('New client connected');

  // for message chat
  socket.on('SEND_MESSAGE', (data) => {
    // Construct a new tweet object @fro mock
    const tweet = {
      twid: data['id'],
      active: false,
      author: data['name'],
      avatar: 'test_avatar',
      body: data['text'],
      date: new Date(),
      screenname: 'test_screenname',
    };

    // Construct a new tweet object @fro twitter
    // const tweet = {
    //   twid: data['id'],
    //   active: false,
    //   author: data['user']['name'],
    //   avatar: data['user']['profile_image_url'],
    //   body: data['text'],
    //   date: data['created_at'],
    //   screenname: data['user']['screen_name']
    // };

    // Create a new model instance with our object
    const tweetEntry = new Tweet(tweet);

    // Save to the database
    tweetEntry.save((err) => {
      if (!err) {
        // If everything is cool, socket.io emits the tweet.
        io.emit('RECEIVE_MESSAGE', tweet);
      }
    });

    // io.emit('RECEIVE_MESSAGE', tweet);
    // io.emit('RECEIVE_MESSAGE', data);

  });

  // for users
  socket.on('SEND_USER', (data) => {
    if (users.indexOf(data.username) != -1) {
      // return;
      updataUsernames();
    } else {    
      socket.username = data.username;
      users.push(data.username);   
      updataUsernames();
    }
     
    // io.emit('RECEIVE_USER', users);
  });

  // update user name
  const updataUsernames = () => {
    io.emit('RECEIVE_USER', users);
  }

  // for users logut manually
  socket.on('LOGOUT_USER', (data) => {
    console.log('user logout');
    users.splice(users.indexOf(data.username), 1);
    updataUsernames();
  });
  

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected');
    if (!socket.username) {
      return;
    } else {
      users.splice(users.indexOf(socket.username), 1);
      updataUsernames();
    }
  });
});
