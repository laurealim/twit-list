const express = require("express");
const hdb = require('express-handlebars');
const Twit = require('twit');

const app = express();
const port = process.env.PORT || 4000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Set Views
app.engine('handlebars', hdb());
app.set("view engine", "handlebars");

// Set Routs
app.get('/', function(req, res){
  res.render('home');
});

// starting server
server.listen(port, function(){
  console.log("Server is running!!!");
});


const twitter = Twit({
  consumer_key: '********', // yout twitter customer_key
  consumer_secret: '********', // your consumer_secret
  access_token: '********', // your access_token
  access_token_secret: '********' // your access_token_secret
});

// const stream = twitter.stream('statuses/filter', { track: 'javascript' }, function(stream){
//   console.log(stream);
//   stream.on('data', function(data){
//     console.log(data);
//   });
// });

 // const stream = twitter.stream('statuses/filter', { track: 'javascript' });
 var stream = twitter.stream('statuses/filter', { track: 'javascript' });

// listen to the twitter stream and tweet comes in send it to the client real time
// twitter.stream('statuses/filter', { track: 'javascript' }, function(stream) {
//
//   console.log("first");
//     stream.on('data', function (data) {
//         io.sockets.emit('tweet', data);
//         console.log(data.text);
//     });
// });

// create a socket.io connection with the client
io.on('connect', function(socket) {
  stream.on('tweet', function(tweet) {
    socket.emit('tweets', tweet);
  });
});
