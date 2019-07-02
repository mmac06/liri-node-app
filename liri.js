require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var bandName = "";
var movieName = "";
var songName = "";

var userTrigger = process.argv[2];
var nodeArgs = process.argv;

// var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


// if user types "concert-this" it taps into spofity API and same for the other two user inputs
if (userTrigger==="movie-this"){
    for (var i = 3; i < nodeArgs.length; i++) {

        movieName += nodeArgs[i]


        // if (i > 2 && i < nodeArgs.length) {
        //     movieName = movieName + "+" + nodeArgs[i];
        // } else {
        //     movieName += nodeArgs[i];
        // }
    }


}
var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "i=tt3896198&apikey=dd77419d";
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