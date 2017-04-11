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
  	var nodeArgs = process.argv;
  	var song = "";

  		for (var i = 3; i < nodeArgs.length; i++) {

  		if (i > 3 && i < nodeArgs.length) {

    song = song + "+" + nodeArgs[i];
    console.log(song);

  }

  		else {

    song += nodeArgs[i];

  }
}
  	
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
  	// Store all of the arguments in an array
		var nodeArgs = process.argv;


// Create an empty variable for holding the movie name
		var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
		for (var i = 3; i < nodeArgs.length; i++) {

  		if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  		else {

    movieName += nodeArgs[i];

  }
}

	if (process.argv[3] === undefined) {


	var mrNobody = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json";
	request(mrNobody, function(error, response, body) {

		if (!error && response.statusCode === 200) {

    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("Year movie came out: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Country of origin: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
			}
    });
}


  	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json"

	request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("Year movie came out: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Country of origin: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    }

  });
}
	


// }
// fs.writeFile("log.txt", data, function(err) {

//   // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

//   // Otherwise, it will print: "movies.txt was updated!"
//   console.log("log.txt was updated!");

  
// });
