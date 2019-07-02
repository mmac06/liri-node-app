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

// var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


// if user types "movie-this" it taps into spofity API and same for the other two user inputs
if (userTrigger === "movie-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        movieName += nodeArgs[i]
    }
}
else if (userTrigger === "concert-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        concertName += nodeArgs[i]
    }
} else if (userTrigger === "spotify-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        spotifyName += nodeArgs[i]
    }
} 
// else if (userTrigger === "do-what-it-says") {
//     // FIGURE OUT LATER XXX

// }
else {
    console.log("LIRI doesn't have this information.")
}
var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "i=tt3896198&apikey=dd77419d";
var spofityQuery = ;
var concertQuery ;


console.log("movieQuery:", movieQuery);

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