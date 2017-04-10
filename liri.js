var Twitter = require("twitter");
var keys = require('./keys');
var client = new Twitter(keys.twitterKeys);
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// console.log("Please enter a command for LiriBot: my-tweets <username>, spotify-this-song <song name>, movie-this <movie name >, or do-what-it-says");

// Create a "Prompt" with a series of questions.
var nodeArgs = process.argv;
var command = process.argv[2];


 
 	if (command === "my-tweets") {
	var screenName = process.argv[3];


	client.get('statuses/user_timeline', { user_id: screenName, count: 20, trim_user: true }, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {


    console.log(tweets[i].created_at + tweets[i].text);
    }
  }
});
		
		
  		

  }

// else if {
// 	(command === "spotify-this-song") { 
	


// }
// fs.writeFile("log.txt", data, function(err) {

//   // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

//   // Otherwise, it will print: "movies.txt was updated!"
//   console.log("log.txt was updated!");

  
// });
