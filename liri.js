// add all node packages
var spotifynode = require("Node-Spotify-API");
var axios = require("axios");
var moment = require("moment");
var dotenv =  require ("DotEnv");
require("dotenv").config();

// spotify keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

function concert-this(process.argv[3]) {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(queryURL);
            var results = response.root;

            for (var i = 0; i<results.length; i++) {
                var venue = results[i].venue.name;
                var location = results[i].venue.city + ", " + results[i].venue.country;
                var date = moment(results[i].venue.datetime, "MM/DD/YYYY");

                console.log(artist, "\n", venue, "\n", location, "\n", date, "\n\n");
            }
}

function spotify-this-song(song) {

}

function movie-this(movie) {

}

function do-what-it-says(random) {

}

