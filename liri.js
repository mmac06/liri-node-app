require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);


// SEE 7:10 IN CLASS VIDEO
var pick = function (caseData, functionData) {
    switch caseData {
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