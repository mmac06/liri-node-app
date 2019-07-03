require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);

var concertName = "";
var movieName = "";
var spotifyName = "";
var saysText = "";

var userTrigger = process.argv[2];
var nodeArgs = process.argv;



// if user types "movie-this" it taps into spofity API and same for the other two user inputs
if (userTrigger === "movie-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else movieName += nodeArgs[i];

        axios.get("http://www.omdbapi.com/?t=" + movieName + "&i=tt3896198&apikey=trilogy").then(
            function (response) {

                if (response.data.length === 0) {
                    console.log("No movie records found.");

                }
                else {
                    var movie = response.data;
                    console.log("Movie title:", movie.Title);
                    console.log("Movie year:", movie.Released);
                    console.log("IMDB rating:", movie.Ratings[0].Value);
                    console.log("Rotten Tomatoes rating:", movie.Ratings[1].Value);
                    console.log("Movie country:", movie.Country);
                    console.log("Movie plot:", movie.Plot);
                    console.log("Movie actors:", movie.Actors + "\n");
                    // for (var i = 0; i < response.data.length; i++) {
                    //     var movie = response.data[i];
                    //     console.log("varMovie:", movie);
                    //     console.log("Movie title:", movie.Title);
                    //     console.log("Movie year:", movie.Released);
                    //     console.log("IMDB rating:", movie.Ratings[0].Value);
                    //     console.log("Rotten Tomatoes rating:", movie.Ratings[1].Value);
                    //     console.log("Movie country:", movie.Country);
                    //     console.log("Movie plot:", movie.Plot);
                    //     console.log("Movie actors:", movie.Actors + "\n");

                    // }
                };

            }
        )

    }
}

// Concert search
else if (userTrigger === "concert-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            concertName = concertName + "+" + nodeArgs[i];
        } else concertName += nodeArgs[i];
        axios.get("https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp").then(
            function (response) {
                // Returns message if no matches found
                if (response.data.length === 0) {
                    console.log("No concert records found.");
                }
                else {
                    for (var i = 0; i < response.data.length; i++) {
                        var event = response.data[i];
                        var concertDate = moment(event.datetime).format("MM/DD/YYYY")
                        //    Displays concert venue, city, and date in MM/DD/YYYY format
                        console.log("Concert venue:", event.venue.name);
                        console.log("Concert city:", event.venue.city);
                        console.log("Concert date:", concertDate + "\n");
                    }
                };
            }
        )
    }

    // Spotify search
} else if (userTrigger === "spotify-this-song") {
    var spotify = new Spotify(keys.spotify);

    // for loop, adding "+" to multi-word entries
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            spotifyName = spotifyName + "+" + nodeArgs[i];
        }
        else {
            spotifyName += nodeArgs[i];
        }
    }

    // pulls user entry into the spotify API
    spotify.search({ type: 'track', query: spotifyName }, function (err, data) {
        if (err) {
            return console.log('Spotify error occurred: ' + err);
        }

        console.log("-------------------------------------------------")
        console.log("Spotify Song Link:", data.tracks.items[i].preview_url);
        console.log("Spotify Artist Name:", data.tracks.items[i].artists[0].name);
        console.log("Spotify Song Name:", data.tracks.items[i].name);

    });

    console.log("spotifyName:", spotifyName);
}

// do what it says section
else if (userTrigger === "do-what-it-says") {
    console.log("------------do what it says---------------")
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        var array = data.toString().split(",");
        console.log("arrays:", array[0], array[1])


    });


}


else {
    console.log("LIRI doesn't have this information.")
}
