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
  consumer_key: '84SM4bUOoHPP8qwAIOMyocRwV',
  consumer_secret: 'cwKZzOsDvAIED61nNiz7bNjSEEAqRzRDCiuiqmOKdto0eFJuVP',
  access_token: '585440337-G1WJuqdp7K9pbdGO6HzS7aqFAvojLM4l3fsi2jtX',
  access_token_secret: 'dn8VtSVvkKqLo9xuG9FiScug2cIQjQRqB4r3XaNXFKgRE'
});

// const stream = twitter.stream('statuses/filter', { track: 'javascript' }, function(stream){
//   console.log(stream);
//   stream.on('data', function(data){
//     console.log(data);
//   });
// });

 // const stream = twitter.stream('statuses/filter', { track: 'javascript' });
 var stream = twitter.stream('statuses/filter', { track: 'javascript' });


// Connection With the Socket
// io.on('connect', function(socket){
//   stream.on('tweet', function(tweet){
//     socket.emit('tweets', tweet);
//   });
// });


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
