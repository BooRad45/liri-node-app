var Twitter = require("twitter");
var keys = require('./keys');
var client = new Twitter(keys.twitterKeys);
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var exec = require('child_process').exec;


var command = process.argv[2];

if (command === "my-tweets") {

    client.get('statuses/user_timeline', { user_id: "BooRad45", count: 20, trim_user: true }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].created_at + tweets[i].text);
                // this is overwriting the previous entry each time
                fs.appendFile("log.txt", command + " " + tweets[i].text, function(err) {

                    if (err) {
                        return console.log(err);
                    }

                });

            }
            console.log("log.txt was updated!");
        }
    });
} else if (command === "spotify-this-song") {
    var nodeArgs = process.argv;
    var song = "";

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            song = song + "+" + nodeArgs[i];

        } else {

            song += nodeArgs[i];
        }
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;


        } else if (process.argv[3] === undefined) {
            spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE' }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    console.log("Artist: " + data.artists[0].name + "\nSong: " + data.name);
                }
            });
        } else if (process.argv[3]) {
            var dataArray = data.tracks.items.length;
            for (var i = 0; i < dataArray; i++) {
                var songTitle = data.tracks.items[i].name;
                if (songTitle.includes(process.argv[3])) {
                    console.log("Artist: " + data.tracks.items[i].artists[0].name + "  " + "Song Name: " + data.tracks.items[i].name + "  " + "Album: " + data.tracks.items[i].album.name + "  " + "Track Link: " + data.tracks.items[i].external_urls.spotify + "\n");

                    fs.appendFile("log.txt", command + " " + song + " " + songTitle + " " + data.tracks.items[i].name + " " + data.tracks.items[i].album.name + " " + data.tracks.items[i].external_urls.spotify, function(err) {


                        if (err) {
                            return console.log(err);
                        }




                    });
                }
            }
            console.log("log.txt was updated!");
        }
    });
} else if (command === "movie-this") {
    var nodeArgs = process.argv;


    // Create an empty variable for holding the movie name
    var movieName = "";


    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            movieName += nodeArgs[i];

        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

    request(queryUrl, function(error, response, body) {

        if (error) {
            console.log("Error occurred: " + error);
        } else if (process.argv[3] === undefined) {

            var mrNobody = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json";
            request(mrNobody, function(error, response, body) {

                console.log("The movie's title is: " + JSON.parse(body).Title);
                console.log("Year movie came out: " + JSON.parse(body).Year);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("Country of origin: " + JSON.parse(body).Country);
                console.log("The movie's language is: " + JSON.parse(body).Language);
                console.log("The movie's plot: " + JSON.parse(body).Plot);
                console.log("The movie's actors are: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);

                fs.appendFile("log.txt", command + " " + movieName + " " + JSON.parse(body).Title + "," + JSON.parse(body).Year + "," + JSON.parse(body).imdbRating + "," + JSON.parse(body).Country + "," + JSON.parse(body).Language + "," + JSON.parse(body).Plot + "," + JSON.parse(body).Actors + "," + JSON.parse(body).Ratings[1].Value, function(err) {


                    if (err) {
                        return console.log(err);
                    }


                    console.log("log.txt was updated!");

                });

            });
        } else if (!error && response.statusCode === 200) {

            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("Year movie came out: " + JSON.parse(body).Year);
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("Country of origin: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie's plot: " + JSON.parse(body).Plot);
            console.log("The movie's actors are: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);

            fs.appendFile("log.txt", command + " " + movieName + " " + JSON.parse(body).Title + "," + JSON.parse(body).Year + "," + JSON.parse(body).imdbRating + "," + JSON.parse(body).Country + "," + JSON.parse(body).Language + "," + JSON.parse(body).Plot + "," + JSON.parse(body).Actors + "," + JSON.parse(body).Ratings[1].Value, function(err) {


                if (err) {
                    return console.log(err);
                }


                console.log("log.txt was updated!");

            });
        }

    });
} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        var doIt = ("node " + "liri.js " + dataArr[0] + " " + JSON.parse(dataArr[1]));
        exec(doIt, function(error, stdout, stderr) {
            console.log(doIt);
            console.log(stdout);

            fs.appendFile("log.txt", doIt + "," + stdout, function(err) {


                if (err) {
                    return console.log(err);
                }




            });
        });
        console.log("log.txt was updated!");

    });
}
