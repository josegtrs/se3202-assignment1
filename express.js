var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweetinfo: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
    var tweet = req.body.tweetIDNAME;

    tweetinfo.push({
      text: tweet.split(';')[1],
      created_at: Date(),
        id: parseInt(tweet.split(';')[0])
    })

    res.send('created tweet');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
    var searchID = req.body.userID;
    res.send({tweetinfo:tweetinfo});



});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
    var search = req.body.data;

    tweetinfo.forEach(function(Object) {
        if(Object.user.name == search[0]) {
            Object.user.screen_name = search[1];
        }
        });

    res.send('updated name');

});

//Delete 
app.delete('/tweetinfo/', function(req, res) {
  //TODO: delete a tweet
    var id = req.body.id;
    //console.log(id);
    tweetinfo.forEach(function(Object,index) {
        // console.log(Object.id);
        // console.log(id);
        if(Object.id == id) {
            tweetinfo.splice(index, 1);
        }
    });

    res.send('deleted');

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});