require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var concertName = "";
var movieName = "";
var spotifyName = "";
var saysText = "";

var userTrigger = process.argv[2];
var nodeArgs = process.argv;


// if user types "movie-this" it taps into spofity API and same for the other two user inputs
if (userTrigger === "movie-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else movieName += nodeArgs[i]

    }
}
else if (userTrigger === "concert-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            concertName = concertName + "+" + nodeArgs[i];
        } else concertName += nodeArgs[i];
        axios.get("https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp").then(
            function (response) {
                // Returns message if no matches found
                if (response.data.length === 0) {
                    console.log("No records found.");
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
                }
            }
        )


    }
} else if (userTrigger === "spotify-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            spotifyName = concertName + "+" + nodeArgs[i];
            spotifyName += nodeArgs[i]
        }
    }
    // else if (userTrigger === "do-what-it-says") {
    //     // FIGURE OUT LATER XXX

}
else {
    console.log("LIRI doesn't have this information.")
}

var concertQuery = "https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp";
var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "&i=tt3896198&apikey=dd77419d";
// var spotifyQuery = spotify.search({ type: 'track', query: spotifyName }, function (err, data) {
//     if (err) {
//         return console.log('Spotify error occurred: ' + err);
//     }

//     console.log("spotData:", data);
// });




console.log("concertQuery:", concertQuery);
console.log("movieQuery:", movieQuery);
// console.log("spotifyQuery:", spotifyQuery);

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s




// -------------------------

// SEE 7:10 IN CLASS VIDEO
var pick = function (caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            getBands(functionData);
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't have this information.")
    }
};