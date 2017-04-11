var Twitter = require("twitter");
var keys = require('./keys');
var client = new Twitter(keys.twitterKeys);
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// console.log("Please enter a command for LiriBot: my-tweets <username>, spotify-this-song <song name>, movie-this <movie name >, or do-what-it-says");

// Create a "Prompt" with a series of questions.
var command = process.argv[2];
 
 	if (command === "my-tweets") {

	client.get('statuses/user_timeline', { user_id: "BooRad45", count: 20, trim_user: true }, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {

    console.log(tweets[i].created_at + tweets[i].text);
    		}
  		}
	});
  }

  else if (command === "spotify-this-song") {
  	// console.log(command);
  	var song = process.argv[3];
  	
  	spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    		} 
    		else if (song === undefined) {
    			console.log("Artist: The Ace of Base " + "      Song Name: The Sign");

    		}
    		else {
    			var dataArray = data.tracks.items.length;
    			// console.log(dataArray);
    			for (var i = 0; i < dataArray; i++) {
    			console.log("Artist: " + data.tracks.items[i].artists[0].name + "  " + "Song Name: " + data.tracks.items[i].name + "  " + "Album: " + data.tracks.items[i].album.name + "  " + "Track Link: " + data.tracks.items[i].external_urls.spotify + "\n");
    		  }
    		}
    		
	  });
  }

  else if (command === "movie-this") {
  	var movie = process.argv[3];

  }


	
// else if {
    		// 	 (song == "") {
    		// 		spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE' }, hollaback);
    		// 		console.log(this);
    		// 	}
    		// }

// }
// fs.writeFile("log.txt", data, function(err) {

//   // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

//   // Otherwise, it will print: "movies.txt was updated!"
//   console.log("log.txt was updated!");

  
// });
